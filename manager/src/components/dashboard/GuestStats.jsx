import { useGuestsContext } from '../../context/GuestsContext';
import styles from './GuestStats.module.css';

const GuestStats = () => {
    const { guests } = useGuestsContext();

    const calculateTotalWithCompanions = () => {
        return guests.reduce((total, guest) => {
            if (guest.assist === true) {
                let count = 1;
                if (guest.partnersName && Array.isArray(guest.partnersName)) {
                    count += guest.partnersName.length;
                }
                return total + count;
            }
            return total;
        }, 0);
    };

    const totalGuests = guests.length;
    const totalChurch = guests.filter(guest => guest.assistChurch).length;
    const totalWithCompanions = calculateTotalWithCompanions();
    const totalNotAttending = guests.filter(guest => guest.assist === "false" || guest.assist === false).length;

    console.log('Total no asistirán a la boda:', totalNotAttending);

    return (
        <div className={styles.statsContainer}>
            <div className={styles.statCard}>
                <span className={styles.icon}>👥</span>
                <div className={styles.statInfo}>
                    <span className={styles.label}>Total Invitados</span>
                    <span className={styles.value}>{totalGuests}</span>
                </div>
            </div>

            <div className={styles.statCard}>
                <span className={styles.icon}>⛪</span>
                <div className={styles.statInfo}>
                    <span className={styles.label}>Asistencia Iglesia</span>
                    <span className={styles.value}>{totalChurch}</span>
                </div>
            </div>

            <div className={styles.statCard}>
                <span className={styles.icon}>🎉</span>
                <div className={styles.statInfo}>
                    <span className={styles.label}>Total con Acompañantes</span>
                    <span className={styles.value}>{totalWithCompanions}</span>
                </div>
            </div>

            <div className={styles.statCard}>
                <span className={styles.icon}>❌</span>
                <div className={styles.statInfo}>
                    <span className={styles.label}>No Asistirán a la Boda</span>
                    <span className={styles.value}>{totalNotAttending}</span>
                </div>
            </div>
        </div>
    );
};

export default GuestStats; 