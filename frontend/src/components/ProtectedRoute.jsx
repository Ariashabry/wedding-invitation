import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const checkSession = () => {
        const session = JSON.parse(localStorage.getItem('adminSession') || '{}');
        
        if (!session.isAdmin) {
            return false;
        }

        // Verificar si la sesión ha expirado
        if (Date.now() > session.expiresAt) {
            localStorage.removeItem('adminSession');
            return false;
        }

        return true;
    };

    if (!checkSession()) {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ProtectedRoute; 