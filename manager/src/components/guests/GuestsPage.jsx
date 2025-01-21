import { useState, useRef, useEffect } from 'react';
import { useGuestsContext } from '../../context/GuestsContext';
import Header from '../layout/Header';
import Table from '../shared/Table';
import GuestManagement from './GuestManagement';
import GuestFilters from './GuestFilters';
import styles from './GuestsPage.module.css';
import { updateGuest } from '../../services/api';
import Swal from 'sweetalert2';
import EditGuestModal from './EditGuestModal';

const GuestsPage = () => {
    const { guests, loading, error, fetchGuests } = useGuestsContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [churchFilter, setChurchFilter] = useState('all');
    const [weddingFilter, setWeddingFilter] = useState('all');
    const filterSectionRef = useRef(null);
    const formSectionRef = useRef(null);
    const [expandedRow, setExpandedRow] = useState(null);
    const [editingGuest, setEditingGuest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({
        key: 'index',
        direction: 'desc'
    });

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
            // Aplicar filtro de búsqueda
            if (searchTerm.trim()) {
                const isPhoneSearch = /^[0-9\s]*$/.test(searchTerm);

                if (isPhoneSearch) {
                    const phoneNumber = (guest.phone || '').replace(/[\s+]/g, '');
                    const searchPhone = searchTerm.replace(/[\s+]/g, '');
                    if (!(phoneNumber.includes(searchPhone) && searchPhone.length >= 6)) {
                        return false;
                    }
                } else {
                    const searchTermCapitalized = capitalizeWords(searchTerm);
                    const fullNameCapitalized = capitalizeWords(guest.fullName);
                    const partnersCapitalized = (guest.partnersName || []).map(name => capitalizeWords(name));

                    if (!(searchTermCapitalized.length >= 3 && (
                        fullNameCapitalized.includes(searchTermCapitalized) || 
                        partnersCapitalized.some(name => name.includes(searchTermCapitalized))
                    ))) {
                        return false;
                    }
                }
            }

            // Aplicar filtro de iglesia
            if (churchFilter !== 'all') {
                switch (churchFilter) {
                    case 'confirmed':
                        if (!guest.assistChurch) return false;
                        break;
                    case 'pending':
                        if (guest.assistChurch !== null) return false;
                        break;
                    case 'notAttending':
                        if (guest.assistChurch !== false) return false;
                        break;
                }
            }

            // Aplicar filtro de recepción
            if (weddingFilter !== 'all') {
                switch (weddingFilter) {
                    case 'confirmed':
                        if (!guest.assist) return false;
                        break;
                    case 'pending':
                        if (guest.assist !== null) return false;
                        break;
                    case 'notAttending':
                        if (guest.assist !== false) return false;
                        break;
                }
            }

            return true;
        })
        .sort((a, b) => b.id - a.id);

    const getStatusIcon = (status) => {
        if (status === null) return '○'; // círculo vacío para pendiente
        if (status === true) return '●';  // círculo lleno para confirmado
        return '×';  // x para no asiste
    };

    // Función para manejar el ordenamiento
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Función para renderizar el indicador de ordenamiento
    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return (
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
            );
        }
        return sortConfig.direction === 'asc' ? (
            <svg className="w-3 h-3 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        ) : (
            <svg className="w-3 h-3 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        );
    };

    const sortedGuests = [...filteredGuests].sort((a, b) => {
        if (sortConfig.key === 'fullName') {
            // Convertir nombres a minúsculas para una comparación consistente
            const nameA = (a.fullName || '').toLowerCase();
            const nameB = (b.fullName || '').toLowerCase();
            
            // Ordenar alfabéticamente
            if (sortConfig.direction === 'asc') {
                return nameA.localeCompare(nameB, 'es', { sensitivity: 'base' });
            } else {
                return nameB.localeCompare(nameA, 'es', { sensitivity: 'base' });
            }
        }
        // Por defecto, mantener el orden original
        return 0;
    });

    const columns = [
        { 
            header: '#',
            key: 'index',
            className: 'w-8 text-center py-1',
            render: (_, index) => (
                <span className="text-xs text-gray-500">
                    {sortedGuests.length - index}
                </span>
            )
        },
        {
            header: 'Editar',
            key: 'actions',
            className: 'w-10 text-center py-1',
            render: (row) => (
                <button
                    onClick={() => handleEdit(row._id)}
                    title="Editar invitado"
                    className="p-0.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                >
                    <svg 
                        className="w-3.5 h-3.5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                        />
                    </svg>
                </button>
            )
        },
        { 
            header: 'Nombre',
            key: 'fullName',
            className: 'min-w-[150px] max-w-[200px] py-1',
            headerRender: () => (
                <button 
                    onClick={() => handleSort('fullName')}
                    className="w-full h-full flex items-center gap-1 hover:bg-gray-50 p-1 rounded cursor-pointer"
                    title="Ordenar por nombre"
                >
                    <span className="font-medium">Nombre</span>
                    {getSortIcon('fullName')}
                </button>
            ),
            render: (row) => (
                <div className="flex flex-col leading-none">
                    <span className="text-sm font-medium">{capitalizeWords(row.fullName)}</span>
                    {row.phone && (
                        <span className="text-xs text-gray-400 mt-0.5">
                            {row.phone}
                        </span>
                    )}
                </div>
            )
        },
        { 
            header: 'Acompañantes',
            key: 'companions',
            className: 'min-w-[160px] max-w-[240px] py-1',
            render: (row) => {
                const companions = row.partnersName || [];
                if (companions.length === 0) return (
                    <span className="text-xs text-gray-400">-</span>
                );
                return (
                    <div className="flex flex-col leading-none">
                        {companions.map((name, idx) => (
                            <span key={idx} className="text-xs text-gray-600 mt-0.5">
                                {capitalizeWords(name)}
                            </span>
                        ))}
                    </div>
                );
            }
        },
        { 
            header: 'Asistencia',
            key: 'status',
            className: 'w-[100px] py-1',
            render: (row) => (
                <div className="flex flex-col gap-1">
                    <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${
                        row.assistChurch === null ? 'bg-gray-100 text-gray-600' :
                        row.assistChurch ? 'bg-green-100 text-green-600' : 
                        'bg-red-100 text-red-600'
                    }`}>
                        <span className="text-sm leading-none">{getStatusIcon(row.assistChurch)}</span>
                        <span className="text-xs">Iglesia</span>
                    </div>
                    <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${
                        row.assist === null ? 'bg-gray-100 text-gray-600' :
                        row.assist ? 'bg-green-100 text-green-600' : 
                        'bg-red-100 text-red-600'
                    }`}>
                        <span className="text-sm leading-none">{getStatusIcon(row.assist)}</span>
                        <span className="text-xs">Recepción</span>
                    </div>
                </div>
            )
        }
    ];

    // Reemplazar el handleEdit existente
    const handleEdit = (id) => {
        const guest = guests.find(g => g._id === id);
        if (guest) {
            setEditingGuest(guest);
            setIsModalOpen(true);
        }
    };

    // Agregar handleSave para el modal
    const handleSave = async (formData) => {
        try {
            // Guardar la posición actual del scroll
            const scrollPosition = window.pageYOffset;

            await updateGuest(editingGuest._id, formData);
            await fetchGuests();
            setIsModalOpen(false);
            setEditingGuest(null);
            
            // Restaurar la posición del scroll después de un pequeño delay
            setTimeout(() => {
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'instant'
                });
            }, 0);

            Swal.fire({
                title: '¡Actualizado!',
                html: `<strong>${capitalizeWords(formData.fullName)}</strong> ha sido actualizado exitosamente`,
                icon: 'success',
                confirmButtonColor: '#3b82f6'
            });
        } catch (error) {
            console.error('Error al actualizar invitado:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el invitado',
                icon: 'error',
                confirmButtonColor: '#3b82f6'
            });
        }
    };

    const handleExportCSV = () => {
        // Preparar los datos para el CSV
        const csvData = filteredGuests.map((guest, index) => ({
            'Número': filteredGuests.length - index,
            'Nombre': capitalizeWords(guest.fullName),
            'Teléfono': guest.phone || '',
            'Acompañantes': (guest.partnersName || []).map(name => capitalizeWords(name)).join(', ') || '-',
            'Iglesia': guest.assistChurch === null ? 'Pendiente' : 
                      guest.assistChurch ? 'Confirmado' : 'No Asiste',
            'Recepción': guest.assist === null ? 'Pendiente' : 
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
                        className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-md z-30 mb-6"
                        style={{ 
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
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

                    <div className="min-h-[calc(100vh-12rem)] flex flex-col mt-20 sm:mt-8">
                        <div className={`${styles.tableSection} bg-white rounded-lg p-2 sm:p-6 shadow-sm border border-gray-100`}>
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
                            
                            <div className="relative border border-gray-200 rounded-lg">
                                <div className="overflow-y-auto h-[calc(100vh-350px)] sm:h-[calc(100vh-300px)]">
                                    <table className="w-full">
                                        <thead className="sticky top-0 bg-white shadow-sm z-20">
                                            <tr>
                                                {columns.map(column => (
                                                    <th 
                                                        key={column.key} 
                                                        className={`${column.className} border-b border-gray-200 bg-white`}
                                                    >
                                                        {column.headerRender ? column.headerRender() : column.header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedGuests.map((row, index) => (
                                                <tr key={row._id || index}>
                                                    {columns.map(column => (
                                                        <td key={column.key} className={column.className}>
                                                            {column.render ? column.render(row, index) : row[column.key]}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="mt-4 px-4 py-3 text-sm text-gray-600">
                                Total: {sortedGuests.length} invitados
                            </div>
                        </div>
                        
                        {filteredGuests.length === 0 && (
                            <div className="flex-grow min-h-[50vh]"></div>
                        )}
                    </div>
                </div>
            </div>
            
            <EditGuestModal
                guest={editingGuest}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingGuest(null);
                }}
                onSave={handleSave}
            />
        </div>
    );
};

export default GuestsPage;