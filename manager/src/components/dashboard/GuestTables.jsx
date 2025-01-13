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

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    const churchColumns = [
        {
            header: '#',
            key: 'index',
            render: (row, index) => index + 1
        },
        { 
            header: 'Nombre', 
            key: 'fullName',
            render: (row) => capitalizeWords(row.fullName)
        },
        { 
            header: 'Asistencia Iglesia', 
            key: 'assistChurch',
            render: (row) => row.assistChurch ? 'Sí' : 'No'
        },
        {
            header: 'Acompañantes',
            key: 'totalGuests',
            render: (row) => {
                let total = 0;
                if (row.partner) total += row.partnersName?.length || 0;
                if (row.childrens) total += row.childrensQuantity || 0;
                return total;
            }
        }
    ];

    const weddingColumns = [
        {
            header: '#',
            key: 'index',
            render: (row, index) => index + 1
        },
        { 
            header: 'Nombre', 
            key: 'fullName',
            render: (row) => capitalizeWords(row.fullName)
        },
        { 
            header: 'Asistencia Boda', 
            key: 'assist',
            render: (row) => row.assist ? 'Sí' : 'No'
        },
        {
            header: 'Acompañantes',
            key: 'companions',
            render: (row) => {
                const companions = [];
                if (row.partner && row.partnersName?.length > 0) {
                    companions.push(...row.partnersName.map(name => capitalizeWords(name)));
                }
                return companions.length > 0 ? companions.join(', ') : '-';
            }
        },
        {
            header: 'Niños',
            key: 'children',
            render: (row) => {
                return row.childrens ? row.childrensQuantity : '-';
            }
        },
        {
            header: 'Mensaje',
            key: 'message',
            render: (row) => row.message || '-'
        }
    ];

    const churchData = guests.filter(g => g.assistChurch);
    const totalChurchGuests = churchData.reduce((acc, guest) => {
        let total = 1; // Count the guest themselves
        if (guest.partner) total += guest.partnersName?.length || 0;
        if (guest.childrens) total += guest.childrensQuantity || 0;
        return acc + total;
    }, 0);

    const weddingData = guests.filter(g => g.assist);
    const totalWeddingAdults = weddingData.reduce((acc, guest) => {
        let total = 1; // Count the guest themselves
        if (guest.partner) total += guest.partnersName?.length || 0;
        return acc + total;
    }, 0);

    const totalWeddingChildren = weddingData.reduce((acc, guest) => {
        return acc + (guest.childrens ? guest.childrensQuantity : 0);
    }, 0);

    return (
        <div className={styles.tablesGrid}>
            <Table 
                title="Asistencia a Iglesia" 
                columns={churchColumns} 
                data={churchData} 
                footer={`Total Asistentes: ${totalChurchGuests}`}
            />
            <Table 
                title="Asistencia a Boda" 
                columns={weddingColumns} 
                data={weddingData} 
                footer={`Total Adultos: ${totalWeddingAdults} | Total Niños: ${totalWeddingChildren} | Total General: ${totalWeddingAdults + totalWeddingChildren}`}
            />
        </div>
    );
};

export default GuestTables; 