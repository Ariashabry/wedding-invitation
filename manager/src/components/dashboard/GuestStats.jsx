import styles from './GuestStats.module.css';
import { useGuestsContext } from '../../context/GuestsContext';
import { useStatistics } from '../../hooks/useStatistics';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

const GuestStats = () => {
    const { guests, loading, error } = useGuestsContext();
    const statistics = useStatistics(guests);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className={styles.statsGrid}>
            {/* Card - Total Invitados */}
            <div className={styles.card}>
                <div className={`${styles.cardIcon} ${styles.blueGradient}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                    </svg>
                </div>
                <div className={styles.cardContent}>
                    <p className={styles.cardLabel}>Total Invitados</p>
                    <h4 className={styles.cardValue}>{guests.length}</h4>
                </div>
            </div>

            {/* Card - Asistencia Iglesia */}
            <div className={styles.card}>
                <div className={`${styles.cardIcon} ${styles.pinkGradient}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                        <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className={styles.cardContent}>
                    <p className={styles.cardLabel}>Asistencia Iglesia</p>
                    <h4 className={styles.cardValue}>{statistics.assistToChucrh}</h4>
                </div>
            </div>

            {/* Card - Total Niños */}
            <div className={styles.card}>
                <div className={`${styles.cardIcon} ${styles.greenGradient}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                    </svg>
                </div>
                <div className={styles.cardContent}>
                    <p className={styles.cardLabel}>Total Niños</p>
                    <h4 className={styles.cardValue}>{statistics.totalChildrens}</h4>
                </div>
            </div>
        </div>
    );
};

export default GuestStats; 