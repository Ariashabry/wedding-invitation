import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Configuración base de axios
const api = axios.create({
    baseURL: API_URL
});

export const getGuests = async () => {
    try {
        const response = await api.get('/api/guests');
        return response.data;
    } catch (error) {
        console.error('Error fetching guests:', error);
        throw error;
    }
};

export const createGuest = async (guestData) => {
    try {
        const response = await api.post('/api/guests', guestData);
        return response.data;
    } catch (error) {
        console.error('Error creating guest:', error);
        throw error;
    }
};

export const updateGuest = async (id, guestData) => {
    try {
        const response = await api.put(`/api/guests/${id}`, guestData);
        return response.data;
    } catch (error) {
        console.error('Error updating guest:', error);
        throw error;
    }
};

export const deleteGuest = async (id) => {
    try {
        const response = await api.delete(`/api/guests/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting guest:', error);
        throw error;
    }
};

// Servicios de Wishes
export const getWishes = async () => {
    try {
        const response = await api.get('/api/wishes');
        return response.data;
    } catch (error) {
        console.error('Error fetching wishes:', error);
        throw error;
    }
};

export const createWish = async (wishData) => {
    try {
        const response = await api.post('/api/wishes', wishData);
        return response.data;
    } catch (error) {
        console.error('Error creating wish:', error);
        throw error;
    }
};

export const updateWish = async (id, wishData) => {
    try {
        const response = await api.put(`/api/wishes/${id}`, wishData);
        return response.data;
    } catch (error) {
        console.error('Error updating wish:', error);
        throw error;
    }
};

export const deleteWish = async (id) => {
    try {
        const response = await api.delete(`/api/wishes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting wish:', error);
        throw error;
    }
};

export default api; 