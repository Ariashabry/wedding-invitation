import { useState } from 'react';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.layout}>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className={`${styles.main} ${isSidebarOpen ? styles.mainShifted : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;