import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="p-4 xl:ml-80">
                <Navbar />
                <main className="mt-2">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
