import { useState } from 'react';
import { useGuestsContext } from '../../context/GuestsContext';
import Header from '../layout/Header';
import Table from '../shared/Table';
import GuestManagement from './GuestManagement';
import GuestFilters from './GuestFilters';
import styles from './GuestsPage.module.css';

const GuestsPage = () => {
    const { guests, loading, error } = useGuestsContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Función para capitalizar palabras en formato título
    const capitalizeWords = (str) => {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const filteredGuests = guests
        .filter(guest => {
            // Convertir tanto el término de búsqueda como el nombre a minúsculas para comparar
            const searchTermLower = searchTerm.toLowerCase();
            const fullNameLower = guest.fullName.toLowerCase();
            const partnersLower = (guest.partnersName || []).map(name => name.toLowerCase());

            // Buscar en nombre y acompañantes
            const matchesSearch = fullNameLower.includes(searchTermLower) || 
                                partnersLower.some(name => name.includes(searchTermLower));

            const matchesStatus = statusFilter === 'all' ? true :
                statusFilter === 'confirmed' ? (guest.assist === true || guest.assistChurch === true) :
                statusFilter === 'pending' ? (guest.assist === null || guest.assistChurch === null) :
                (guest.assist === false || guest.assistChurch === false);
            
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => b.id - a.id); // Ordenar de mayor a menor

    const columns = [
        { 
            header: '#',
            key: 'index',
            className: styles.indexColumn,
            render: (_, index) => filteredGuests.length - index
        },
        { 
            header: 'Nombre',
            key: 'fullName',
            className: styles.nameColumn,
            render: (row) => capitalizeWords(row.fullName)
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
                return companions.map(name => capitalizeWords(name)).join(', ') || '-';
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
        <div>
            <Header 
                title="Gestión de Invitados" 
                subtitle="Administra y visualiza el estado de todos los invitados"
            />
            <div className="px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mt-6 mb-8">
                        <div className="bg-blue-50 p-3 mb-4 rounded-lg border border-blue-100">
                            <h2 className="text-lg font-semibold text-blue-800 mb-1">
                                Formulario de Registro
                            </h2>
                            <p className="text-sm text-blue-600">
                                Aquí puedes agregar nuevos invitados y sus acompañantes
                            </p>
                        </div>
                        <GuestManagement />
                    </div>

                    <div className="bg-gray-50 p-3 mb-6 rounded-lg border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                            Filtros y Búsqueda
                        </h2>
                        <p className="text-sm text-gray-600 mb-3">
                            Busca por nombre o filtra por estado de asistencia
                        </p>
                        <GuestFilters 
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                        />
                    </div>

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
        </div>
    );
};

export default GuestsPage;