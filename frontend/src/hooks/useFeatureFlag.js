import { useState, useEffect } from 'react';

export const useFeatureFlag = (featureKey) => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        // Función para obtener el estado actual del feature
        const checkFeatureState = () => {
            const features = JSON.parse(localStorage.getItem('features') || '{}');
            setIsEnabled(!!features[featureKey]);
        };

        // Verificar estado inicial
        checkFeatureState();

        // Escuchar cambios en localStorage
        const handleStorageChange = () => {
            checkFeatureState();
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Verificar periódicamente (por si acaso)
        const interval = setInterval(checkFeatureState, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [featureKey]);

    return isEnabled;
}; 