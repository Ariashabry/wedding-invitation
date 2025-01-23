import { useState, useEffect } from 'react';
import './Loader.css';

const IMAGES_TO_PRELOAD = {
    hero: [
        '/assets/photos/main/principal.webp'
    ],
    carousel: [
        '/assets/photos/img-alcides01.webp',
        '/assets/photos/img-alcides02.webp',
        '/assets/photos/img-alcides03.webp',
        '/assets/photos/img-alcides04.webp',
        '/assets/photos/img-alcides05.webp'
    ],
    icons: [
        '/assets/images/arrows-icon.png',
        '/assets/images/favicon.png'
    ]
};

const Loader = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);
    const [loadingStatus, setLoadingStatus] = useState({
        images: false,
        fonts: false,
        features: false
    });

    const preloadImage = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = () => {
                console.error(`Error cargando: ${url}`);
                resolve(); // Resolvemos igual para no bloquear la carga
            };
        });
    };

    const preloadAllImages = async () => {
        const totalImages = Object.values(IMAGES_TO_PRELOAD).flat().length;
        let loadedImages = 0;

        try {
            for (const [section, urls] of Object.entries(IMAGES_TO_PRELOAD)) {
                await Promise.all(urls.map(async (url) => {
                    await preloadImage(url);
                    loadedImages++;
                    setProgress(prev => prev + (40 / totalImages));
                }));
                console.log(`✅ Sección ${section} cargada`);
            }
            setLoadingStatus(prev => ({ ...prev, images: true }));
        } catch (error) {
            console.error('Error en precarga de imágenes:', error);
            setLoadingStatus(prev => ({ ...prev, images: true })); // Continuamos aunque haya error
        }
    };

    const checkFonts = async () => {
        try {
            await document.fonts.ready;
            setLoadingStatus(prev => ({ ...prev, fonts: true }));
            setProgress(prev => prev + 30);
            console.log('✅ Fuentes cargadas');
        } catch (error) {
            console.error('Error cargando fuentes:', error);
            setLoadingStatus(prev => ({ ...prev, fonts: true }));
        }
    };

    const checkFeatureFlags = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/features`);
            if (response.ok) {
                setLoadingStatus(prev => ({ ...prev, features: true }));
                setProgress(prev => prev + 30);
                console.log('✅ Feature flags cargados');
            }
        } catch (error) {
            console.error('Error cargando feature flags:', error);
            setLoadingStatus(prev => ({ ...prev, features: true }));
        }
    };

    useEffect(() => {
        Promise.all([
            preloadAllImages(),
            checkFonts(),
            checkFeatureFlags()
        ]);
    }, []);

    useEffect(() => {
        if (Object.values(loadingStatus).every(Boolean)) {
            setTimeout(() => {
                onLoadComplete();
            }, 500);
        }
    }, [loadingStatus, onLoadComplete]);

    return (
        <div className="loader-container">
            <div className="loader-content">
                <div className="loader-ring"></div>
                <div className="loader-progress">
                    <div 
                        className="progress-bar"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                </div>
                <p className="loader-text">
                    Cargando {Math.min(Math.round(progress), 100)}%
                </p>
            </div>
        </div>
    );
};

export default Loader; 