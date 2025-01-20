import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FeatureFlagsPanel.module.css';

const FeatureFlagsPanel = () => {
    const navigate = useNavigate();
    const [features, setFeatures] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        try {
            setIsLoading(true);
            setError(null);
            console.log('Fetching features from:', `${API_URL}/api/features`);
            
            const response = await axios.get(`${API_URL}/api/features`);
            console.log('Features received:', response.data);
            
            if (!response.data || typeof response.data !== 'object') {
                throw new Error('Invalid data format received');
            }
            
            // Actualizar el estado con los datos de la API
            setFeatures(response.data);
            console.log('Features state updated:', response.data);
        } catch (error) {
            console.error('Error fetching features:', error);
            setError(`Error al cargar los feature flags: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = async (featureName) => {
        try {
            const currentFeature = features[featureName];
            console.log('Toggling feature:', featureName);
            console.log('Current state:', currentFeature);

            const updatedFeatures = {
                [featureName]: {
                    enabled: !currentFeature.enabled,
                    description: currentFeature.description || 'Sin descripción',
                    updatedAt: new Date().toISOString()
                }
            };

            console.log('Sending update to API:', updatedFeatures);
            
            const response = await axios.post(`${API_URL}/api/features`, updatedFeatures);
            console.log('API response:', response.data);

            if (response.data.success) {
                console.log('Update successful, fetching new state');
                await fetchFeatures(); // Recargar los datos después de la actualización
            } else {
                throw new Error('La actualización no fue exitosa');
            }
        } catch (error) {
            console.error('Error in toggle:', error);
            setError(`Error al actualizar el feature flag: ${error.message}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminSession');
        navigate('/admin');
    };

    if (isLoading) {
        return <div className="text-center p-4">Cargando feature flags...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-600">{error}</div>;
    }

    if (!features || Object.keys(features).length === 0) {
        return <div className="text-center p-4">No hay feature flags disponibles</div>;
    }

    console.log('Rendering with features:', features);

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <div className="p-6">
                    <div className={styles.header}>
                        <h2 className="text-2xl font-bold">Feature Flags Panel</h2>
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                    
                    <div className="space-y-6">
                        {Object.entries(features).map(([feature, data]) => (
                            <div key={feature} className={styles.featureItem}>
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <span className="font-medium">{feature}</span>
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({data.enabled ? 'Habilitado' : 'Deshabilitado'})
                                        </span>
                                        <p className={styles.description}>
                                            {data.description || 'Sin descripción'}
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.enabled}
                                            onChange={() => handleToggle(feature)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                {data.updatedAt && (
                                    <p className={styles.timestamp}>
                                        Último cambio: {new Date(data.updatedAt).toLocaleString()}
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