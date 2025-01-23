import 'dotenv/config.js';
import '../config/database.js';
import Guest from '../models/Guest.js';

const normalizePhoneNumber = (phone) => {
    if (!phone) return null;

    // Eliminar espacios al inicio y final
    let cleanPhone = phone.trim();

    // Eliminar cualquier carácter que no sea número o '+' al inicio
    cleanPhone = cleanPhone.replace(/^[^0-9+]+/, '');

    // Eliminar cualquier carácter que no sea número al final
    cleanPhone = cleanPhone.replace(/[^0-9]+$/, '');

    // Eliminar todos los caracteres no numéricos (excepto el + inicial si existe)
    let numbers = cleanPhone;
    if (cleanPhone.startsWith('+')) {
        numbers = '+' + cleanPhone.slice(1).replace(/\D/g, '');
    } else {
        numbers = cleanPhone.replace(/\D/g, '');
    }

    // Si el número tiene 8 dígitos (número boliviano sin código), agregar el código de país
    if (numbers.length === 8) {
        numbers = '591' + numbers;
    }

    // Si el número tiene 11 dígitos y empieza con 591, asegurarnos de agregar el +
    if (numbers.length === 11 && numbers.startsWith('591')) {
        return '+' + numbers;
    }

    // Si el número tiene la longitud correcta (11 o 12 dígitos incluyendo código de país)
    if (numbers.length === 11 || numbers.length === 12) {
        return '+' + numbers.slice(-11);
    }

    return phone; // Devolver el original si no cumple los criterios
};

const updatePhoneNumbers = async () => {
    try {
        const guests = await Guest.find({});
        let updateCount = 0;
        let errorCount = 0;
        let skippedCount = 0;
        let invalidCount = 0;

        console.log('🚀 Iniciando actualización de números telefónicos...\n');

        for (const guest of guests) {
            const originalPhone = guest.phone;
            const normalizedPhone = normalizePhoneNumber(originalPhone);

            // Solo actualizar si el número es diferente y válido
            if (normalizedPhone && normalizedPhone !== originalPhone) {
                try {
                    await Guest.updateOne(
                        { _id: guest._id },
                        { $set: { phone: normalizedPhone } }
                    );
                    updateCount++;
                    console.log(`✅ Actualizado: ${guest.fullName}`);
                    console.log(`   Original: ${originalPhone}`);
                    console.log(`   Nuevo: ${normalizedPhone}\n`);
                } catch (error) {
                    errorCount++;
                    console.error(`❌ Error actualizando ${guest.fullName}:`, error);
                }
            } else if (!normalizedPhone && originalPhone) {
                invalidCount++;
                console.log(`⚠️ Número inválido: ${guest.fullName}`);
                console.log(`   Número: ${originalPhone}\n`);
            } else {
                skippedCount++;
                console.log(`⏭️ Omitido: ${guest.fullName} - No requiere cambios\n`);
            }
        }

        console.log('\n📊 Resumen de la actualización:');
        console.log(`✅ Actualizados: ${updateCount}`);
        console.log(`⏭️ Omitidos: ${skippedCount}`);
        console.log(`⚠️ Inválidos: ${invalidCount}`);
        console.log(`❌ Errores: ${errorCount}`);
        console.log(`📱 Total procesados: ${guests.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error al procesar los invitados:', error);
        process.exit(1);
    }
};

// Ejecutar el script
updatePhoneNumbers(); 