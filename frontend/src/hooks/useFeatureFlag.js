import { useState, useEffect } from 'react';

export const useFeatureFlag = (featureKey) => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        // Función para obtener el estado actual del feature
        const getFeatureState = () => {
            try {
                const features = JSON.parse(localStorage.getItem('features') || '{}');
                return features[featureKey] || false;
            } catch (error) {
                console.error('Error reading feature flag:', error);
                return false;
            }
        };

        // Establecer estado inicial
        setIsEnabled(getFeatureState());

        // Crear un intervalo para verificar cambios
        const interval = setInterval(() => {
            const currentState = getFeatureState();
            if (currentState !== isEnabled) {
                setIsEnabled(currentState);
            }
        }, 1000); // Verificar cada segundo

        return () => clearInterval(interval);
    }, [featureKey, isEnabled]);

    return isEnabled;
}; 