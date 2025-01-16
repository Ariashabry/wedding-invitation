import styles from './GuestFilters.module.css';

const GuestFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
    return (
        <div className={`${styles.filtersContainer} mt-6`}>
            <div className={styles.searchWrapper}>
                <div className={styles.searchContainer}>
                    <svg 
                        className={styles.searchIcon} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className={styles.clearButton}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            
            <div className={styles.filterWrapper}>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={styles.statusSelect}
                >
                    <option value="all">Ver todos</option>
                    <option value="confirmed">Confirmados</option>
                    <option value="pending">Pendientes</option>
                    <option value="notAttending">No asisten</option>
                </select>
            </div>
        </div>
    );
};

export default GuestFilters; 