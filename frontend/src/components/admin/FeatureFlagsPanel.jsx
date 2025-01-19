import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FeatureFlagsPanel.module.css';

const FeatureFlagsPanel = () => {
    const navigate = useNavigate();
    const initialFeatures = {
        TIPACU_BUTTON: false,
        CEREMONY_LOCATIONS: false,
        TIMELINE: false,
        GALLERY: false
    };

    const [features, setFeatures] = useState(initialFeatures);
    const [lastUpdated, setLastUpdated] = useState({});

    const featureDescriptions = {
        TIPACU_BUTTON: "Controla la visibilidad del botón de regalo T'ipacu",
        CEREMONY_LOCATIONS: "Muestra/oculta la sección de ubicaciones de la ceremonia",
        TIMELINE: "Controla la visualización del cronograma del evento",
        GALLERY: "Habilita/deshabilita la galería de fotos"
    };

    useEffect(() => {
        const savedFeatures = localStorage.getItem('features');
        const savedTimestamps = localStorage.getItem('featureTimestamps');
        
        if (savedFeatures) {
            const parsedFeatures = JSON.parse(savedFeatures);
            const updatedFeatures = { ...initialFeatures, ...parsedFeatures };
            setFeatures(updatedFeatures);
            setLastUpdated(JSON.parse(savedTimestamps || '{}'));
        } else {
            localStorage.setItem('features', JSON.stringify(initialFeatures));
            localStorage.setItem('featureTimestamps', '{}');
        }
    }, []);

    const handleToggle = (featureName) => {
        const updatedFeatures = {
            ...features,
            [featureName]: !features[featureName]
        };
        const updatedTimestamps = {
            ...lastUpdated,
            [featureName]: new Date().toLocaleString()
        };
        
        setFeatures(updatedFeatures);
        setLastUpdated(updatedTimestamps);
        localStorage.setItem('features', JSON.stringify(updatedFeatures));
        localStorage.setItem('featureTimestamps', JSON.stringify(updatedTimestamps));
    };

    const handleLogout = () => {
        localStorage.removeItem('adminSession');
        navigate('/admin');
    };

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <div className="p-6">
                    <div className={styles.header}>
                        <h2 className="text-2xl font-bold">Feature Flags Panel</h2>
                    </div>
                    
                    <div className="space-y-6">
                        {Object.entries(features).map(([feature, enabled]) => (
                            <div key={feature} className={styles.featureItem}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-medium">{feature}</span>
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({enabled ? 'Habilitado' : 'Deshabilitado'})
                                        </span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={enabled}
                                            onChange={() => handleToggle(feature)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <p className={styles.description}>
                                    {featureDescriptions[feature]}
                                </p>
                                {lastUpdated[feature] && (
                                    <p className={styles.timestamp}>
                                        Último cambio: {lastUpdated[feature]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureFlagsPanel; 