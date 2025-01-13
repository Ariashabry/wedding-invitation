import styles from './Table.module.css';

const Table = ({ title, columns, data, footer }) => {
    return (
        <div className={styles.tableWrapper}>
            {title && (
                <div className={styles.tableHeader}>
                    <h3 className={styles.tableTitle}>{title}</h3>
                </div>
            )}
            
            <div className={styles.tableResponsive}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className={styles.tableHeaderCell}>
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className={styles.tableRow}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className={styles.tableCell}>
                                        {column.render ? column.render(row, rowIndex) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {footer && (
                <div className={styles.tableFooter}>
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Table; 