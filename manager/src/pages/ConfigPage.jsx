import { useState } from 'react';
import styles from './ConfigPage.module.css';

const ConfigPage = () => {
    const [isLoading] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Configuración</h1>
                
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Página en Construcción</h2>
                    {isLoading ? (
                        <div className={styles.loading}>Cargando...</div>
                    ) : (
                        <div className={styles.message}>
                            Esta sección está en desarrollo. Próximamente podrás:
                            <ul className={styles.featureList}>
                                <li>Configurar datos de la boda</li>
                                <li>Gestionar usuarios</li>
                                <li>Personalizar apariencia</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfigPage; 