import { createContext, useContext } from 'react';
import { useGuests } from '../hooks/useGuests';

const GuestsContext = createContext();

export const GuestsProvider = ({ children }) => {
    const guestsData = useGuests();

    return (
        <GuestsContext.Provider value={guestsData}>
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