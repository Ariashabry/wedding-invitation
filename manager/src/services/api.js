import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getGuests = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/guests`);
        return response.data;
    } catch (error) {
        console.error('Error fetching guests:', error);
        throw error;
    }
}; 

export const createGuest = async (guestData) => {
    try {
        const response = await axios.post(`${API_URL}/api/guests`, guestData);
        return response.data;
    } catch (error) {
        console.error('Error creating guest:', error);
        throw error;
    }
}; 