import { useState, useEffect } from 'react';

export const useStatistics = (guests) => {
    const [statistics, setStatistics] = useState({
        assistToChucrh: 0,
        notAssistToChucrh: 0,
        assistsToWedding: 0,
        notAssistsToWedding: 0,
        totalAssists: 0,
        totalChildrens: 0,
        foodRestrictions: 0,
        // ... otras estadísticas
    });

    useEffect(() => {
        if (guests?.length > 0) {
            calculateStatistics(guests);
        }
    }, [guests]);

    const calculateStatistics = (guestData) => {
        const newStats = guestData.reduce((acc, guest) => ({
            assistToChucrh: acc.assistToChucrh + (guest.assistChurch ? 1 : 0),
            notAssistToChucrh: acc.notAssistToChucrh + (guest.assistChurch ? 0 : 1),
            assistsToWedding: acc.assistsToWedding + (guest.assist ? 1 : 0),
            notAssistsToWedding: acc.notAssistsToWedding + (guest.assist ? 0 : 1),
            totalAssists: acc.totalAssists + calculateTotalAssists(guest),
            totalChildrens: acc.totalChildrens + (guest.childrensQuantity || 0),
            foodRestrictions: acc.foodRestrictions + (guest.dietaryRestrictions ? 1 : 0),
        }), {
            assistToChucrh: 0,
            notAssistToChucrh: 0,
            assistsToWedding: 0,
            notAssistsToWedding: 0,
            totalAssists: 0,
            totalChildrens: 0,
            foodRestrictions: 0,
        });

        setStatistics(newStats);
    };

    const calculateTotalAssists = (guest) => {
        let total = guest.assist ? 1 : 0;
        if (guest.assist && guest.partner) total += guest.partnersName.length;
        if (guest.assist && guest.childrens) total += guest.childrensQuantity;
        return total;
    };

    return statistics;
}; 