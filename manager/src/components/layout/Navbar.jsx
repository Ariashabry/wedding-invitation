import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.breadcrumb}>
                    <nav aria-label="breadcrumb" className={styles.breadcrumbNav}>
                        <ol className={styles.breadcrumbList}>
                            <li className={styles.breadcrumbItem}>
                                <p className={styles.breadcrumbText}>
                                    dashboard
                                </p>
                            </li>
                        </ol>
                    </nav>
                    <h6 className={styles.pageTitle}>
                        dashboard
                    </h6>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 