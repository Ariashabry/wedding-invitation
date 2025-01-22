import { useState, useEffect } from 'react';
import { getWishes, deleteWish } from '../../services/api';
import Header from '../layout/Header';
import WishCard from './WishCard';

const WishesPage = () => {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWishes();
    }, []);

    const fetchWishes = async () => {
        try {
            const data = await getWishes();
            setWishes(data);
        } catch (err) {
            setError('Error al cargar los deseos');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteWish = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este deseo?')) return;

        try {
            await deleteWish(id);
            setWishes(wishes.filter(wish => wish._id !== id));
        } catch (err) {
            setError('Error al eliminar el deseo');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div>
            <Header 
                title="Deseos" 
                subtitle="Mensajes y buenos deseos de los invitados"
            />
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {wishes.map(wish => (
                            <WishCard 
                                key={wish._id} 
                                wish={wish}
                                onDelete={() => handleDeleteWish(wish._id)}
                            />
                        ))}
                    </div>

                    {wishes.length === 0 && (
                        <div className="text-center text-gray-500 mt-8">
                            No hay deseos registrados aún.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishesPage; 