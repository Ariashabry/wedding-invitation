import styles from './GuestFilters.module.css';

const GuestFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.searchWrapper}>
                <div className={styles.searchContainer}>
                    <svg className={styles.searchIcon} width="16" height="16" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                            <svg width="14" height="14" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l4 4m0-4l-4 4" />
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