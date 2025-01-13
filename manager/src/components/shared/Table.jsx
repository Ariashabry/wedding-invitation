import styles from './Table.module.css';

const Table = ({ columns, data, title, footer }) => {
    return (
        <div className={styles.tableCard}>
            {title && (
                <div className={styles.tableHeader}>
                    <h6 className={styles.tableTitle}>
                        {title}
                    </h6>
                </div>
            )}
            
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className={styles.tableHeaderCell}>
                                    <p className={styles.tableHeaderText}>
                                        {column.header}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className={styles.tableCell}>
                                        <p className={styles.tableCellText}>
                                            {column.render ? column.render(row, rowIndex) : row[column.key]}
                                        </p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {footer && (
                    <div className={styles.tableFooter}>
                        <p className={styles.footerText}>{footer}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Table; 