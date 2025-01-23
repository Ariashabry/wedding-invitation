import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFeatureFlag = (featureKey) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchFeatureFlag = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/features`);
                if (response.data && response.data[featureKey]) {
                    setIsEnabled(response.data[featureKey].enabled);
                }
            } catch (error) {
                console.error('Error fetching feature flag:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeatureFlag();
    }, [featureKey, API_URL]);

    return { isEnabled, isLoading };
}; 