import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const menuItems = [
        { path: '/', label: 'Dashboard' },
        { path: '/guests', label: 'Invitados' },
        { path: '/settings', label: 'Configuración' }
    ];

    return (
        <>
            {/* Botón de menú móvil */}
            <button 
                className={styles.mobileMenuButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                Menú
            </button>

            {/* Overlay para móvil */}
            {isOpen && (
                <div 
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarContent}>
                    <div className={styles.logo}>
                        Wedding Manager
                    </div>
                    
                    <nav className={styles.nav}>
                        {menuItems.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => 
                                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar; 