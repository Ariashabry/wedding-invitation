import { useState } from 'react';
import { useGuestsContext } from '../../context/GuestsContext';
import Table from '../shared/Table';
import GuestManagement from './GuestManagement';
import GuestFilters from './GuestFilters';
import styles from './GuestsPage.module.css';

const GuestsPage = () => {
    const { guests, loading, error } = useGuestsContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const columns = [
        { 
            header: '#',
            key: 'index',
            className: styles.indexColumn,
            render: (_, index) => index + 1
        },
        { 
            header: 'Nombre',
            key: 'fullName',
            className: styles.nameColumn
        },
        { 
            header: 'Teléfono',
            key: 'phone',
            className: styles.phoneColumn
        },
        { 
            header: 'Acompañantes',
            key: 'companions',
            className: styles.companionsColumn,
            render: (row) => {
                const companions = row.partnersName || [];
                return companions.join(', ') || '-';
            }
        },
        { 
            header: 'Iglesia',
            key: 'assistChurch',
            className: styles.statusColumn,
            render: (row) => (
                <span className={`${styles.badge} ${
                    row.assistChurch === null ? styles.badgePending :
                    row.assistChurch ? styles.badgeConfirmed : 
                    styles.badgeNotAttending
                }`}>
                    {row.assistChurch === null ? 'Pendiente' :
                     row.assistChurch ? 'Confirmado' : 'No Asiste'}
                </span>
            )
        },
        { 
            header: 'Boda',
            key: 'assist',
            className: styles.statusColumn,
            render: (row) => (
                <span className={`${styles.badge} ${
                    row.assist === null ? styles.badgePending :
                    row.assist ? styles.badgeConfirmed : 
                    styles.badgeNotAttending
                }`}>
                    {row.assist === null ? 'Pendiente' :
                     row.assist ? 'Confirmado' : 'No Asiste'}
                </span>
            )
        }
    ];

    const filteredGuests = guests.filter(guest => {
        const matchesSearch = guest.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' ? true :
            statusFilter === 'confirmed' ? (guest.assist === true || guest.assistChurch === true) :
            statusFilter === 'pending' ? (guest.assist === null || guest.assistChurch === null) :
            (guest.assist === false || guest.assistChurch === false);
        
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner} />
            </div>
        );
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Gestión de Invitados</h1>
                    <p className={styles.subtitle}>
                        Administra y visualiza el estado de todos los invitados
                    </p>
                    <GuestFilters 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />
                </div>

                <GuestManagement />

                <div className={styles.tableSection}>
                    <Table 
                        title="Lista de Invitados"
                        columns={columns}
                        data={filteredGuests}
                        footer={`Total: ${filteredGuests.length} invitados`}
                    />
                </div>
            </div>
        </div>
    );
};

export default GuestsPage;