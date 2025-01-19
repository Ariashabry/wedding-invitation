import { useRef } from 'react';
import styles from './GuestFilters.module.css';

const GuestFilters = ({ 
    searchTerm, 
    setSearchTerm, 
    churchFilter, 
    setChurchFilter,
    weddingFilter,
    setWeddingFilter,
    onInteraction  // Recibir la función de scroll
}) => {
    const filterContainerRef = useRef(null);

    const scrollToFilters = () => {
        if (filterContainerRef.current) {
            const headerOffset = 0;
            const elementPosition = filterContainerRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleInteraction = () => {
        if (onInteraction) {
            onInteraction();
        }
    };

    // Función para capitalizar palabras
    const capitalizeWords = (str) => {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Función para formatear número de teléfono
    const formatPhoneNumber = (value) => {
        // Eliminar todo excepto números
        const numbers = value.replace(/[^\d]/g, '');
        
        // Aplicar formato según la longitud
        if (numbers.length <= 2) {
            return numbers;
        } else if (numbers.length <= 6) {
            return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
        } else if (numbers.length <= 10) {
            return `${numbers.slice(0, 2)} ${numbers.slice(2, 6)} ${numbers.slice(6)}`;
        } else {
            // Limitar a 10 dígitos
            return `${numbers.slice(0, 2)} ${numbers.slice(2, 6)} ${numbers.slice(6, 10)}`;
        }
    };

    // Manejar el cambio en el input
    const handleSearchChange = (e) => {
        const value = e.target.value;
        // Detectar si es búsqueda por teléfono
        const isPhoneSearch = /^[0-9\s]*$/.test(value);

        if (isPhoneSearch) {
            // Si es número de teléfono, aplicar formato
            const formattedPhone = formatPhoneNumber(value);
            setSearchTerm(formattedPhone);
        } else {
            // Si es texto, capitalizar
            const capitalizedText = capitalizeWords(value);
            setSearchTerm(capitalizedText);
        }
    };

    return (
        <div ref={filterContainerRef} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg 
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path 
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleInteraction}
                        className={`${styles.searchInput} pl-10`}
                        placeholder="Buscar por nombre o teléfono..."
                    />
                </div>
                
                <div className="w-full sm:w-auto sm:min-w-[200px]">
                    <select
                        value={churchFilter}
                        onChange={(e) => {
                            setChurchFilter(e.target.value);
                            handleInteraction();
                        }}
                        onFocus={handleInteraction}
                        className="w-full px-4 py-2 border rounded-md"
                    >
                        <option value="all">Iglesia - Todos</option>
                        <option value="confirmed">Iglesia - Confirmados</option>
                        <option value="pending">Iglesia - Pendientes</option>
                        <option value="notAttending">Iglesia - No Asisten</option>
                    </select>
                </div>

                <div className="w-full sm:w-auto sm:min-w-[200px]">
                    <select
                        value={weddingFilter}
                        onChange={(e) => {
                            setWeddingFilter(e.target.value);
                            handleInteraction();
                        }}
                        onFocus={handleInteraction}
                        className="w-full px-4 py-2 border rounded-md"
                    >
                        <option value="all">Boda - Todos</option>
                        <option value="confirmed">Boda - Confirmados</option>
                        <option value="pending">Boda - Pendientes</option>
                        <option value="notAttending">Boda - No Asisten</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default GuestFilters; 