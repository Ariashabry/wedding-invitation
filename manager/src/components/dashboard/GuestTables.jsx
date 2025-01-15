import styles from './GuestTables.module.css';
import { useGuestsContext } from '../../context/GuestsContext';
import Table from '../shared/Table';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

const capitalizeWords = (str) => {
    if (!str) return '';
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const GuestTables = () => {
    const { guests, loading, error } = useGuestsContext();

    // Función para calcular totales incluyendo acompañantes
    const calculateTotalWithCompanions = (data) => {
        return data.reduce((total, guest) => {
            // Contamos al invitado principal
            let count = 1;
            // Sumamos los acompañantes si existen
            if (guest.partnersName && Array.isArray(guest.partnersName)) {
                count += guest.partnersName.length;
            }
            return total + count;
        }, 0);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    const churchColumns = [
        {
            header: '#',
            key: 'index',
            render: (row, index) => (
                <span className={styles.cellText}>{index + 1}</span>
            )
        },
        { 
            header: 'Nombre', 
            key: 'fullName',
            render: (row) => (
                <span className={styles.cellText}>{capitalizeWords(row.fullName)}</span>
            )
        },
        { 
            header: 'Asistencia Iglesia', 
            key: 'assistChurch',
            render: (row) => (
                <span className={`${styles.cellText} ${row.assistChurch ? styles.confirmed : styles.notAttending}`}>
                    {row.assistChurch ? 'Sí' : 'No'}
                </span>
            )
        },
        {
            header: 'Acompañantes',
            key: 'totalGuests',
            render: (row) => {
                let total = 0;
                if (row.partner) total += row.partnersName?.length || 0;
                if (row.childrens) total += row.childrensQuantity || 0;
                return <span className={styles.cellText}>{total}</span>;
            }
        }
    ];

    const weddingColumns = [
        {
            header: '#',
            key: 'index',
            render: (row, index) => (
                <span className={styles.cellText}>{index + 1}</span>
            )
        },
        { 
            header: 'Nombre', 
            key: 'fullName',
            render: (row) => (
                <span className={styles.cellText}>{capitalizeWords(row.fullName)}</span>
            )
        },
        { 
            header: 'Asistencia Boda', 
            key: 'assist',
            render: (row) => (
                <span className={`${styles.cellText} ${row.assist ? styles.confirmed : styles.notAttending}`}>
                    {row.assist ? 'Sí' : 'No'}
                </span>
            )
        },
        {
            header: 'Acompañantes',
            key: 'companions',
            render: (row) => {
                const companions = [];
                if (row.partner && row.partnersName?.length > 0) {
                    companions.push(...row.partnersName.map(name => capitalizeWords(name)));
                }
                return (
                    <span className={styles.cellText}>
                        {companions.length > 0 ? companions.join(', ') : '-'}
                    </span>
                );
            }
        },
        {
            header: 'Niños',
            key: 'children',
            render: (row) => (
                <span className={styles.cellText}>
                    {row.childrens ? row.childrensQuantity : '-'}
                </span>
            )
        },
        {
            header: 'Mensaje',
            key: 'message',
            render: (row) => (
                <span className={styles.cellText}>
                    {row.message || '-'}
                </span>
            )
        }
    ];

    const churchData = guests.filter(g => g.assistChurch);
    const weddingData = guests.filter(g => g.assist);

    const churchTotal = calculateTotalWithCompanions(churchData);
    const weddingTotal = calculateTotalWithCompanions(weddingData);

    return (
        <div className={styles.tablesGrid}>
            <div className={styles.tableWrapper}>
                <Table 
                    title="Asistencia a Iglesia" 
                    columns={churchColumns} 
                    data={churchData} 
                    footer={`Total con acompañantes: ${churchTotal}`}
                />
            </div>
            <div className={styles.tableWrapper}>
                <Table 
                    title="Asistencia a Boda" 
                    columns={weddingColumns} 
                    data={weddingData} 
                    footer={`Total con acompañantes: ${weddingTotal}`}
                />
            </div>
        </div>
    );
};

export default GuestTables; 