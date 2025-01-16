import styles from './GuestFilters.module.css';

const GuestFilters = ({ 
    searchTerm, 
    setSearchTerm, 
    churchFilter, 
    setChurchFilter,
    weddingFilter,
    setWeddingFilter 
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:flex-1">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nombre..."
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            
            <div className="w-full sm:w-auto sm:min-w-[200px]">
                <select
                    value={churchFilter}
                    onChange={(e) => setChurchFilter(e.target.value)}
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
                    onChange={(e) => setWeddingFilter(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                >
                    <option value="all">Boda - Todos</option>
                    <option value="confirmed">Boda - Confirmados</option>
                    <option value="pending">Boda - Pendientes</option>
                    <option value="notAttending">Boda - No Asisten</option>
                </select>
            </div>
        </div>
    );
};

export default GuestFilters; 