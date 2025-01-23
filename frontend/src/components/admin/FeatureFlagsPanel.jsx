import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FeatureFlagsPanel.module.css';

const FeatureFlagsPanel = () => {
    const navigate = useNavigate();
    const [features, setFeatures] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingFeatures, setUpdatingFeatures] = useState(new Set());
    const [isProcessing, setIsProcessing] = useState(false);

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/api/features`);
            
            if (!response.data || typeof response.data !== 'object') {
                throw new Error('Invalid data format received');
            }
            
            setFeatures(response.data);
        } catch (error) {
            setError(`Error al cargar los feature flags: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = async (featureName) => {
        if (isProcessing || updatingFeatures.has(featureName)) {
            return;
        }

        try {
            setIsProcessing(true);
            setUpdatingFeatures(prev => new Set(prev).add(featureName));
            const currentFeature = features[featureName];

            const updatedFeatures = {
                [featureName]: {
                    enabled: !currentFeature.enabled,
                    description: currentFeature.description || 'Sin descripción',
                    updatedAt: new Date().toISOString()
                }
            };
            
            const response = await axios.post(`${API_URL}/api/features`, updatedFeatures);

            if (response.data.success) {
                setFeatures(prev => ({
                    ...prev,
                    [featureName]: {
                        ...prev[featureName],
                        enabled: !currentFeature.enabled,
                        updatedAt: new Date().toISOString()
                    }
                }));
            } else {
                throw new Error('La actualización no fue exitosa');
            }
        } catch (error) {
            setError(`Error al actualizar el feature flag: ${error.message}`);
            await fetchFeatures();
        } finally {
            setIsProcessing(false);
            setUpdatingFeatures(prev => {
                const newSet = new Set(prev);
                newSet.delete(featureName);
                return newSet;
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminSession');
        navigate('/admin');
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingContent}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Cargando feature flags...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorContent}>
                    <div className="text-red-600 text-center">
                        <svg className={styles.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className={styles.errorTitle}>Error</p>
                        <p className={styles.errorMessage}>{error}</p>
                        <button 
                            onClick={fetchFeatures}
                            className={styles.retryButton}
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!features || Object.keys(features).length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center text-gray-600">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-sm sm:text-base">No hay feature flags disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <div className={styles.panelContent}>
                    <div className="p-4 sm:p-6">
                        <div className={styles.header}>
                            <h2 className={styles.title}>Feature Flags Panel</h2>
                            <button 
                                onClick={handleLogout}
                                className={styles.logoutButton}
                                disabled={isProcessing}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                        
                        <div className={styles.featuresList}>
                            {Object.entries(features).map(([feature, data]) => {
                                const isUpdating = updatingFeatures.has(feature);
                                return (
                                    <div key={feature} className={styles.featureItem}>
                                        <div className={styles.featureContent}>
                                            <div className={styles.featureInfo}>
                                                <div className={styles.featureHeader}>
                                                    <span className={styles.featureName}>{feature}</span>
                                                    <span className={`${styles.statusBadge} ${
                                                        data.enabled ? styles.statusEnabled : styles.statusDisabled
                                                    } ${isUpdating ? styles.statusUpdating : ''}`}>
                                                        {isUpdating ? 'Actualizando...' : 
                                                         data.enabled ? 'Habilitado' : 'Deshabilitado'}
                                                    </span>
                                                </div>
                                                <p className={styles.description}>
                                                    {data.description || 'Sin descripción'}
                                                </p>
                                            </div>
                                            <label className={`${styles.toggleWrapper} ${isUpdating ? styles.disabled : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={data.enabled}
                                                    onChange={() => handleToggle(feature)}
                                                    disabled={isProcessing || isUpdating}
                                                    className="sr-only peer"
                                                />
                                                <div className={`${styles.toggle} ${
                                                    data.enabled ? styles.toggleEnabled : ''
                                                } ${isUpdating ? styles.toggleDisabled : ''}`}>
                                                    <div className={`${styles.toggleHandle} ${
                                                        data.enabled ? styles.toggleHandleEnabled : ''
                                                    } ${isUpdating ? styles.toggleHandleAnimated : ''}`}>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        {data.updatedAt && (
                                            <p className={styles.timestamp}>
                                                Último cambio: {new Date(data.updatedAt).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureFlagsPanel; 