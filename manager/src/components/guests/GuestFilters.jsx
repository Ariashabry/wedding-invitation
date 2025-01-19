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

    return (
        <div ref={filterContainerRef} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:flex-1">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleInteraction();
                        }}
                        onFocus={handleInteraction}
                        placeholder="Buscar por nombre..."
                        className="w-full px-4 py-2 border rounded-md"
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