import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/', icon: '📊', text: 'Dashboard' },
        { path: '/guests', icon: '👥', text: 'Invitados' },
        { path: '/wishes', icon: '💌', text: 'Mensajes' },
        { path: '/config', icon: '⚙️', text: 'Configuración' }
    ];

    return (
        <>
            <button 
                className={styles.menuButton} 
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <button 
                        className={styles.closeButton} 
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                <nav className={styles.nav}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.navLink} ${
                                location.pathname === item.path ? styles.active : ''
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.text}>{item.text}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {isOpen && (
                <div 
                    className={styles.overlay} 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar; 