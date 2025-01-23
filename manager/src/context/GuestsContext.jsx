import { createContext, useContext, useState, useEffect } from 'react';
import { getGuests } from '../services/api';

const GuestsContext = createContext();

export const GuestsProvider = ({ children }) => {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGuests = async () => {
        try {
            setLoading(true);
            const data = await getGuests();
            setGuests(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los invitados');
            console.error('Error fetching guests:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    return (
        <GuestsContext.Provider value={{ guests, loading, error, fetchGuests }}>
            {children}
        </GuestsContext.Provider>
    );
};

export const useGuestsContext = () => {
    const context = useContext(GuestsContext);
    if (!context) {
        throw new Error('useGuestsContext must be used within a GuestsProvider');
    }
    return context;
}; 