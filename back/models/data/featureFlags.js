import 'dotenv/config.js';
import '../../config/database.js';
import FeatureFlag from '../FeatureFlag.js';

const featureFlags = [
    {
        name: "TIPACU_BUTTON",
        description: "Controla la visibilidad del botón de regalo T'ipacu",
        enabled: false,
        updatedAt: new Date()
    },
    {
        name: "LIVE_COUNTDOWN",
        description: "Controla la visualización del contador en vivo",
        enabled: true,
        updatedAt: new Date()
    },
    {
        name: "CEREMONY_LOCATIONS",
        description: "Muestra/oculta la sección de ubicaciones de la ceremonia",
        enabled: true,
        updatedAt: new Date()
    },
    {
        name: "TIMELINE",
        description: "Controla la visualización del cronograma del evento",
        enabled: false,
        updatedAt: new Date()
    },
    {
        name: "GALLERY",
        description: "Habilita/deshabilita la galería de fotos",
        enabled: false,
        updatedAt: new Date()
    },
    {
        name: "WEDDING_REGISTRATION",
        description: "Habilita/deshabilita el formulario de registro para la boda",
        enabled: false,
        updatedAt: new Date()
    },
    {
        name: "WISHES",
        description: "Habilita/deshabilita la funcionalidad de enviar deseos a los novios",
        enabled: false,
        updatedAt: new Date()
    }
];

const initFeatures = async () => {
    try {
        await FeatureFlag.deleteMany({}); // Limpiar features existentes
        await FeatureFlag.insertMany(featureFlags);
        console.log('Feature flags inicializados correctamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al inicializar feature flags:', error);
        process.exit(1);
    }
};

initFeatures(); 