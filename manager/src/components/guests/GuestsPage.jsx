import { useState, useRef, useEffect } from 'react';
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
    const [churchFilter, setChurchFilter] = useState('all');
    const [weddingFilter, setWeddingFilter] = useState('all');
    const filterSectionRef = useRef(null);
    const formSectionRef = useRef(null);

    // Agregar useEffect para scroll al inicio cuando se monte el componente
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant' // Usamos 'instant' en lugar de 'smooth' para evitar la animación
        });
    }, []); // El array vacío significa que solo se ejecutará al montar el componente

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
            // Convertir tanto el término de búsqueda como el nombre y teléfono a minúsculas para comparar
            const searchTermLower = searchTerm.toLowerCase();
            const fullNameLower = guest.fullName.toLowerCase();
            const partnersLower = (guest.partnersName || []).map(name => name.toLowerCase());
            // Eliminar el código de país y espacios del teléfono para la búsqueda
            const phoneNumber = (guest.phone || '').replace(/[\s+]/g, '');

            // Buscar en nombre, acompañantes y teléfono
            const matchesSearch = 
                fullNameLower.includes(searchTermLower) || 
                partnersLower.some(name => name.includes(searchTermLower)) ||
                phoneNumber.includes(searchTerm.replace(/[\s+]/g, '')); // Eliminar espacios y + del término de búsqueda

            // Filtro para iglesia
            const matchesChurch = churchFilter === 'all' ? true :
                churchFilter === 'confirmed' ? guest.assistChurch === true :
                churchFilter === 'pending' ? guest.assistChurch === null :
                guest.assistChurch === false;

            // Filtro para boda
            const matchesWedding = weddingFilter === 'all' ? true :
                weddingFilter === 'confirmed' ? guest.assist === true :
                weddingFilter === 'pending' ? guest.assist === null :
                guest.assist === false;
            
            return matchesSearch && matchesChurch && matchesWedding;
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

    const handleExportCSV = () => {
        // Preparar los datos para el CSV
        const csvData = filteredGuests.map((guest, index) => ({
            'Número': filteredGuests.length - index,
            'Nombre': capitalizeWords(guest.fullName),
            'Teléfono': guest.phone || '',
            'Acompañantes': (guest.partnersName || []).map(name => capitalizeWords(name)).join(', ') || '-',
            'Iglesia': guest.assistChurch === null ? 'Pendiente' : 
                      guest.assistChurch ? 'Confirmado' : 'No Asiste',
            'Boda': guest.assist === null ? 'Pendiente' : 
                    guest.assist ? 'Confirmado' : 'No Asiste'
        }));

        // Convertir a CSV
        const headers = Object.keys(csvData[0]);
        const csvContent = [
            headers.join(','),
            ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
        ].join('\n');

        // Crear y descargar el archivo
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'lista_invitados.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Función de scroll
    const scrollToFilters = () => {
        if (filterSectionRef.current) {
            const yOffset = 0;
            const element = filterSectionRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    };

    // Función de scroll para el formulario
    const scrollToForm = () => {
        if (formSectionRef.current) {
            const yOffset = 0;
            const element = formSectionRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    };

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
            <div className="px-2 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mt-6 mb-8">
                        <div 
                            ref={formSectionRef}
                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                        >
                            <h2 className="text-lg font-semibold text-blue-800 mb-1">
                                Formulario de Registro
                            </h2>
                            <p className="text-sm text-blue-600 mb-4">
                                Aquí puedes agregar nuevos invitados y sus acompañantes
                            </p>
                            <GuestManagement onInteraction={scrollToForm} />
                        </div>
                    </div>

                    <div 
                        ref={filterSectionRef}
                        className="bg-gray-50 p-2 sm:p-3 mb-6 rounded-lg border border-gray-100 sticky z-10"
                        style={{ 
                            backgroundColor: 'rgba(249, 250, 251, 0.95)',
                            top: '1rem',
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                            Filtros y Búsqueda
                        </h2>
                        <p className="text-sm text-gray-600 mb-3">
                            Busca por nombre o filtra por estado de asistencia
                        </p>
                        <GuestFilters 
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            churchFilter={churchFilter}
                            setChurchFilter={setChurchFilter}
                            weddingFilter={weddingFilter}
                            setWeddingFilter={setWeddingFilter}
                            onInteraction={scrollToFilters}
                        />
                    </div>

                    <div className="min-h-[calc(100vh-12rem)] flex flex-col">
                        <div className={`${styles.tableSection} mt-8 bg-white rounded-lg p-2 sm:p-6 shadow-sm border border-gray-100`}>
                            <div className="flex justify-between items-center mb-4 sm:mb-6 px-2 sm:px-0">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Lista de Invitados
                                </h2>
                                <button
                                    onClick={handleExportCSV}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow-sm"
                                >
                                    <span>Exportar CSV</span>
                                </button>
                            </div>
                            
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <Table 
                                    title="Lista de Invitados"
                                    columns={columns}
                                    data={filteredGuests}
                                    footer={`Total: ${filteredGuests.length} invitados`}
                                />
                            </div>
                        </div>
                        
                        {filteredGuests.length === 0 && (
                            <div className="flex-grow min-h-[50vh]"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestsPage;