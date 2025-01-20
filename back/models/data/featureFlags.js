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
    }
];

const initFeatures = async () => {
    try {
        await FeatureFlag.deleteMany({}); // Limpiar features existentes
        await FeatureFlag.insertMany(featureFlags);
        process.exit(0);
    } catch (error) {
        process.exit(1);
    }
};

initFeatures(); 