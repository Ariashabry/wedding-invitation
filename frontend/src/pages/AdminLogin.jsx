import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
            // Guardar timestamp de login junto con el estado
            const session = {
                isAdmin: true,
                expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 horas en milisegundos
            };
            localStorage.setItem('adminSession', JSON.stringify(session));
            navigate('/admin/features');
        } else {
            setError('Contraseña incorrecta');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Panel de Administración
                </h2>
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Acceder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin; 