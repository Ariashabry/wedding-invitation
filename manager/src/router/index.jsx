import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../pages/Layout';
import Dashboard from '../components/dashboard/Dashboard';
import GuestsPage from '../components/guests/GuestsPage';
import WishesPage from '../components/wishes/WishesPage';
import LoginPage from '../pages/LoginPage';
import ConfigPage from '../pages/ConfigPage';

// Múltiples usuarios válidos
const VALID_USERS = [
    {
        username: 'admin',
        password: '1195',
        role: 'admin'
    },
    {
        username: 'pato',
        password: '2024',
        role: 'bride'
    },
    {
        username: 'eliane',
        password: '2024',
        role: 'groom'
    }
];

// Componente de protección simple
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
};

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'guests',
                element: <GuestsPage />
            },
            {
                path: 'wishes',
                element: <WishesPage />
            },
            {
                path: 'config',
                element: <ConfigPage />
            }
        ]
    }
]);

export { VALID_USERS };