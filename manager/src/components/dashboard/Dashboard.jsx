import styles from './Dashboard.module.css';
import GuestStats from './GuestStats';
import GuestTables from './GuestTables';

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <h2 className={styles.title}>Dashboard</h2>
            <GuestStats />
            <GuestTables />
        </div>
    );
};

export default Dashboard; 