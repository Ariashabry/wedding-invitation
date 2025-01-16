import { useState, useEffect } from 'react';
import styles from './GuestManagement.module.css';
import { createGuest } from '../../services/api';
import toast from 'react-hot-toast';
import { useGuestsContext } from '../../context/GuestsContext';

const GuestManagement = () => {
    const { fetchGuests } = useGuestsContext();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        partnersName: [],
        assistChurch: false,
        assist: true,
    });
    const [errors, setErrors] = useState({
        fullName: '',
        phone: '',
        partnersName: []
    });

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Validar todos los campos y actualizar errores
        const newErrors = {
            fullName: validateName(formData.fullName),
            phone: validatePhone(formData.phone),
            partnersName: []
        };

        // Validar acompañantes si existen
        if (formData.partnersName.length > 0) {
            formData.partnersName.forEach((name, index) => {
                if (!name.trim()) {
                    newErrors.partnersName[index] = 'El nombre del acompañante es obligatorio';
                }
            });
        }

        // Actualizar estado de errores
        setErrors(newErrors);

        // Verificar si hay errores
        if (newErrors.fullName || newErrors.phone || newErrors.partnersName.some(error => error)) {
            // Mostrar mensaje de error general
            toast.error('Por favor complete todos los campos requeridos');
            return;
        }

        try {
            setIsLoading(true);
            const guestData = {
                fullName: formData.fullName.trim(),
                phone: formData.phone.trim(),
                partnersName: formData.partnersName.filter(name => name.trim() !== ''),
                assistChurch: formData.assistChurch,
                assist: formData.assist,
            };

            await createGuest(guestData);
            
            // Limpiar el formulario
            setFormData({
                fullName: '',
                phone: '',
                partnersName: [],
                assistChurch: false,
                assist: true,
            });
            setErrors({
                fullName: '',
                phone: '',
                partnersName: []
            });
            
            toast.success('¡Invitado guardado exitosamente!');
            
            // Actualizar la lista de invitados
            await fetchGuests();

        } catch (err) {
            console.error('Error:', err);
            toast.error('Error al guardar el invitado');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddPartner = () => {
        if (formData.partnersName.length < 3) {
            setFormData({
                ...formData,
                partnersName: [...formData.partnersName, '']
            });
        }
    };

    const handleRemovePartner = (index) => {
        const newPartners = formData.partnersName.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            partnersName: newPartners
        });
    };

    const handlePartnerChange = (index, value) => {
        const newPartners = [...formData.partnersName];
        newPartners[index] = value;
        setFormData({
            ...formData,
            partnersName: newPartners
        });
    };

    // Función para capitalizar nombres
    const capitalizeWords = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Validación para el nombre
    const validateName = (name) => {
        if (!name.trim()) {
            return 'El nombre es obligatorio';
        }
        if (name.trim().length < 3) {
            return 'El nombre debe tener al menos 3 caracteres';
        }
        if (!/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(name.trim())) {
            return 'El nombre solo debe contener letras';
        }
        return '';
    };

    // Validación para el teléfono
    const validatePhone = (phone) => {
        if (!phone.trim()) {
            return 'El teléfono es obligatorio';
        }
        if (!/^\d{8}$/.test(phone.trim())) {
            return 'El teléfono debe tener 8 dígitos';
        }
        return '';
    };

    const handleNameChange = (e) => {
        const capitalizedName = capitalizeWords(e.target.value);
        setFormData({
            ...formData,
            fullName: capitalizedName
        });
        setErrors({
            ...errors,
            fullName: validateName(capitalizedName)
        });
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,8}$/.test(value)) {
            setFormData({
                ...formData,
                phone: value
            });
            setErrors({
                ...errors,
                phone: validatePhone(value)
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formHeader}>
                    <div className={styles.headerContent}>
                        <h2 className={styles.formTitle}>Agregar Nuevo Invitado</h2>
                        <button 
                            type="button"
                            onClick={handleSubmit}
                            className={styles.headerButton}
                            disabled={isLoading}
                            style={{
                                backgroundColor: isLoading ? '#93c5fd' : '#3b82f6',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontWeight: '500',
                                minWidth: '120px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    Guardando...
                                </span>
                            ) : 'Guardar Invitado'}
                        </button>
                    </div>
                </div>

                <div className={styles.managementWrapper}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label htmlFor="fullName" className={styles.label}>
                                    <span className={styles.requiredLabel}>Nombre Completo</span>
                                    <span className={styles.requiredAsterisk}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleNameChange}
                                    className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                                    placeholder="Ej: José Feliciano"
                                    required
                                />
                                {errors.fullName && (
                                    <span className={styles.errorMessage}>
                                        {errors.fullName}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone" className={styles.label}>
                                    <span className={styles.requiredLabel}>Teléfono</span>
                                    <span className={styles.requiredAsterisk}>*</span>
                                </label>
                                <div className={styles.phoneInputWrapper}>
                                    <span className={styles.phonePrefix}>+591</span>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        className={`${styles.phoneInput} ${errors.phone ? styles.inputError : ''}`}
                                        placeholder="70707070"
                                        required
                                    />
                                </div>
                                {errors.phone && (
                                    <span className={styles.errorMessage}>
                                        {errors.phone}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    <span className={styles.requiredLabel}>Asistencia a Iglesia</span>
                                    <span className={styles.requiredAsterisk}>*</span>
                                </label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="assistChurch"
                                            checked={formData.assistChurch === true}
                                            onChange={() => setFormData({...formData, assistChurch: true})}
                                            className={styles.radio}
                                        />
                                        <span>Sí</span>
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="assistChurch"
                                            checked={formData.assistChurch === false}
                                            onChange={() => setFormData({...formData, assistChurch: false})}
                                            className={styles.radio}
                                        />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    <span className={styles.requiredLabel}>Asistencia a Boda</span>
                                    <span className={styles.requiredAsterisk}>*</span>
                                </label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="assist"
                                            checked={formData.assist === true}
                                            onChange={() => setFormData({...formData, assist: true})}
                                            className={styles.radio}
                                        />
                                        <span>Sí</span>
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="assist"
                                            checked={formData.assist === false}
                                            onChange={() => setFormData({...formData, assist: false})}
                                            className={styles.radio}
                                        />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>

                            <div className={`${styles.formGroup} col-span-1 sm:col-span-2`}>
                                <div className={styles.partnersHeader}>
                                    <label className={styles.label}>
                                        Acompañantes ({formData.partnersName.length}/3)
                                    </label>
                                    {formData.partnersName.length < 3 && (
                                        <button
                                            type="button"
                                            onClick={handleAddPartner}
                                            className={styles.addPartnerButton}
                                        >
                                            <svg 
                                                className="w-5 h-5 mr-1" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M12 4v16m8-8H4" 
                                                />
                                            </svg>
                                            Agregar Acompañante
                                        </button>
                                    )}
                                </div>
                                
                                <div className={styles.partnersContainer}>
                                    {formData.partnersName.map((partner, index) => (
                                        <div key={index} className={styles.partnerInputGroup}>
                                            <input
                                                type="text"
                                                value={partner}
                                                onChange={(e) => handlePartnerChange(index, e.target.value)}
                                                placeholder={`Nombre del acompañante ${index + 1}`}
                                                className={styles.input}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePartner(index)}
                                                className={styles.removePartnerButton}
                                            >
                                                <svg 
                                                    className="w-5 h-5" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M6 18L18 6M6 6l12 12" 
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GuestManagement; 