import { useState } from 'react';
import styles from './GuestTables.module.css';
import { useGuestsContext } from '../../context/GuestsContext';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

const ITEMS_PER_PAGE = 10;

const GuestTables = () => {
    const { guests, loading, error } = useGuestsContext();
    const [currentPage, setCurrentPage] = useState(1);

    const capitalizeWords = (str) => {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    // Datos filtrados por tipo
    const churchData = guests.filter(g => g.assistChurch);
    const weddingData = guests.filter(g => g.assist === true);
    const notAttendingData = guests.filter(g => g.assist === false);

    // Función para paginar datos
    const paginateData = (data, page) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return data.slice(start, start + ITEMS_PER_PAGE);
    };

    // Función para calcular el total de personas (incluyendo acompañantes)
    const calculateTotalWithPartners = (data) => {
        return data.reduce((total, guest) => {
            // Contamos al invitado principal
            let count = 1;
            // Sumamos sus acompañantes si existen
            if (guest.partnersName && Array.isArray(guest.partnersName)) {
                count += guest.partnersName.length;
            }
            return total + count;
        }, 0);
    };

    // Componente de paginación
    const Pagination = ({ totalItems, currentPage, onPageChange }) => {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        return (
            <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200">
                <div className="text-sm text-gray-700">
                    Mostrando {Math.min(ITEMS_PER_PAGE * (currentPage - 1) + 1, totalItems)} - {Math.min(ITEMS_PER_PAGE * currentPage, totalItems)} de {totalItems}
                </div>
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 text-sm rounded ${
                                currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    // Componente de tabla mejorado con totales
    const Table = ({ title, data, columns }) => {
        const [page, setPage] = useState(1);
        const paginatedData = paginateData(data, page);
        const totalWithPartners = calculateTotalWithPartners(data);

        // Filtrar columnas que tienen datos
        const activeColumns = columns.filter(col => {
            if (col.key === 'index' || col.key === 'fullName') return true;
            return data.some(row => {
                const value = row[col.key];
                return value !== null && value !== undefined && value !== '' && value !== false;
            });
        });

        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                        <p>Invitados principales: {data.length}</p>
                        <span className="text-gray-300">|</span>
                        <p>Total con acompañantes: {totalWithPartners}</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {activeColumns.map(col => (
                                    <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    {activeColumns.map(col => (
                                        <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                                            {col.render ? col.render(row, idx) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {data.length > ITEMS_PER_PAGE && (
                    <Pagination
                        totalItems={data.length}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                )}
            </div>
        );
    };

    return (
        <div className={styles.tablesGrid}>
            <Table 
                title="Asistencia a Iglesia"
                data={churchData}
                columns={[
                    {
                        header: '#',
                        key: 'index',
                        render: (_, idx) => <span className="text-sm text-gray-500">{idx + 1}</span>
                    },
                    {
                        header: 'Nombre',
                        key: 'fullName',
                        render: (row) => (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">
                                    {capitalizeWords(row.fullName)}
                                </span>
                                {row.phone && (
                                    <span className="text-xs text-gray-500">{row.phone}</span>
                                )}
                            </div>
                        )
                    },
                    {
                        header: 'Acompañantes',
                        key: 'partnersName',
                        render: (row) => {
                            if (!row.partnersName?.length) return null;
                            return (
                                <div className="text-sm text-gray-900">
                                    {row.partnersName.map(name => capitalizeWords(name)).join(', ')}
                                </div>
                            );
                        }
                    }
                ]}
            />

            <Table 
                title="Asistencia a Boda"
                data={weddingData}
                columns={[
                    {
                        header: '#',
                        key: 'index',
                        render: (_, idx) => <span className="text-sm text-gray-500">{idx + 1}</span>
                    },
                    {
                        header: 'Nombre',
                        key: 'fullName',
                        render: (row) => (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">
                                    {capitalizeWords(row.fullName)}
                                </span>
                                {row.phone && (
                                    <span className="text-xs text-gray-500">{row.phone}</span>
                                )}
                            </div>
                        )
                    },
                    {
                        header: 'Acompañantes',
                        key: 'partnersName',
                        render: (row) => {
                            if (!row.partnersName?.length) return null;
                            return (
                                <div className="text-sm text-gray-900">
                                    {row.partnersName.map(name => capitalizeWords(name)).join(', ')}
                                </div>
                            );
                        }
                    },
                    {
                        header: 'Mensaje',
                        key: 'message',
                        render: (row) => row.message ? (
                            <span className="text-sm text-gray-600">{row.message}</span>
                        ) : null
                    }
                ]}
            />

            <Table 
                title="No Asistirán"
                data={notAttendingData}
                columns={[
                    {
                        header: '#',
                        key: 'index',
                        render: (_, idx) => <span className="text-sm text-gray-500">{idx + 1}</span>
                    },
                    {
                        header: 'Nombre',
                        key: 'fullName',
                        render: (row) => (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">
                                    {capitalizeWords(row.fullName)}
                                </span>
                                {row.phone && (
                                    <span className="text-xs text-gray-500">{row.phone}</span>
                                )}
                            </div>
                        )
                    },
                    {
                        header: 'Mensaje',
                        key: 'message',
                        render: (row) => row.message ? (
                            <span className="text-sm text-gray-600">{row.message}</span>
                        ) : null
                    }
                ]}
            />
        </div>
    );
};

export default GuestTables; 