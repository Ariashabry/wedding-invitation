import { useState, useEffect } from 'react';
import styles from './EditGuestModal.module.css';

const EditGuestModal = ({ guest, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        assistChurch: null,
        assist: null,
        partnersName: []
    });

    // Función para capitalizar palabras
    const capitalizeWords = (str) => {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Manejar el scroll del body
    useEffect(() => {
        if (isOpen) {
            // Guardar la posición actual del scroll
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // Restaurar la posición del scroll
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
    }, [isOpen]);

    useEffect(() => {
        if (guest) {
            setFormData({
                fullName: capitalizeWords(guest.fullName) || '',
                phone: guest.phone || '',
                assistChurch: guest.assistChurch,
                assist: guest.assist,
                partnersName: guest.partnersName || []
            });
        }
    }, [guest]);

    // Manejador de tecla ESC
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        // Limpieza del event listener
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    const handleNameChange = (e) => {
        const capitalizedName = capitalizeWords(e.target.value);
        setFormData({...formData, fullName: capitalizedName});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fullName.trim()) {
            return;
        }
        onSave(formData);
    };

    // Cerrar modal al hacer clic en el overlay
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const getSelectClassName = (value) => {
        const baseClass = styles.select;
        if (value === null) return `${baseClass} ${styles.selectPending}`;
        if (value === true) return `${baseClass} ${styles.selectConfirmed}`;
        return `${baseClass} ${styles.selectNotAttending}`;
    };

    // Función para manejar cambios en los acompañantes
    const handlePartnerChange = (index, value) => {
        const newPartners = [...formData.partnersName];
        newPartners[index] = capitalizeWords(value);
        setFormData({ ...formData, partnersName: newPartners });
    };

    // Función para agregar nuevo acompañante
    const addPartner = () => {
        setFormData({
            ...formData,
            partnersName: [...formData.partnersName, '']
        });
    };

    // Función para eliminar acompañante
    const removePartner = (index) => {
        const newPartners = formData.partnersName.filter((_, i) => i !== index);
        setFormData({ ...formData, partnersName: newPartners });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Editar Invitado</h2>
                    <button onClick={onClose} className={styles.closeButton}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nombre Completo</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={handleNameChange}
                            className={styles.input}
                            placeholder="Ingrese el nombre completo"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Teléfono</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className={styles.input}
                            placeholder="Ingrese el número de teléfono"
                        />
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Iglesia</label>
                            <select
                                value={formData.assistChurch === null ? 'null' : formData.assistChurch.toString()}
                                onChange={(e) => setFormData({
                                    ...formData, 
                                    assistChurch: e.target.value === 'null' ? null : e.target.value === 'true'
                                })}
                                className={getSelectClassName(formData.assistChurch)}
                            >
                                <option value="null">Por confirmar</option>
                                <option value="true">Asistirá</option>
                                <option value="false">No asistirá</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Boda</label>
                            <select
                                value={formData.assist === null ? 'null' : formData.assist.toString()}
                                onChange={(e) => setFormData({
                                    ...formData, 
                                    assist: e.target.value === 'null' ? null : e.target.value === 'true'
                                })}
                                className={getSelectClassName(formData.assist)}
                            >
                                <option value="null">Por confirmar</option>
                                <option value="true">Asistirá</option>
                                <option value="false">No asistirá</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="flex items-center justify-between mb-2">
                            <label className={styles.label}>Acompañantes</label>
                            <button
                                type="button"
                                onClick={addPartner}
                                className={styles.addButton}
                            >
                                Agregar
                            </button>
                        </div>
                        <div className={styles.partnersList}>
                            {formData.partnersName.map((partner, index) => (
                                <div key={index} className={styles.partnerItem}>
                                    <input
                                        type="text"
                                        value={partner}
                                        onChange={(e) => handlePartnerChange(index, e.target.value)}
                                        className={styles.input}
                                        placeholder={`Nombre del acompañante ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePartner(index)}
                                        className={styles.removeButton}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-medium shadow-sm"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGuestModal; 