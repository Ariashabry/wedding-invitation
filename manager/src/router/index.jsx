import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Dashboard from '../components/dashboard/Dashboard';
import GuestsPage from '../components/guests/GuestsPage';
import WishesPage from '../components/wishes/WishesPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
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
            }
        ]
    }
]);