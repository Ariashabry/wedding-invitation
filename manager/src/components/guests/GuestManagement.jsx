import { useState } from 'react';
import styles from './GuestManagement.module.css';

const GuestManagement = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        partner: false,
        partnersName: [],
        assistChurch: null,
        assist: null,
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implementar lógica de guardado
        console.log('Form data:', formData);
    };

    return (
        <div className={styles.managementWrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>Agregar Invitado</h2>
                <p className={styles.subtitle}>Complete los datos del nuevo invitado</p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName" className={styles.label}>
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Asistencia a Iglesia</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="assistChurch"
                                    value="true"
                                    onChange={(e) => setFormData({...formData, assistChurch: e.target.value === 'true'})}
                                    className={styles.radio}
                                />
                                Sí
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="assistChurch"
                                    value="false"
                                    onChange={(e) => setFormData({...formData, assistChurch: e.target.value === 'true'})}
                                    className={styles.radio}
                                />
                                No
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Asistencia a Boda</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="assist"
                                    value="true"
                                    onChange={(e) => setFormData({...formData, assist: e.target.value === 'true'})}
                                    className={styles.radio}
                                />
                                Sí
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="assist"
                                    value="false"
                                    onChange={(e) => setFormData({...formData, assist: e.target.value === 'true'})}
                                    className={styles.radio}
                                />
                                No
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitButton}>
                        Guardar Invitado
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GuestManagement; 