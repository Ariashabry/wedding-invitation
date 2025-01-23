import { useState, useEffect } from 'react';
import { getGuests } from '../services/api';

export const useGuests = () => {
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
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    return {
        guests,
        loading,
        error,
        refetchGuests: fetchGuests
    };
}; 