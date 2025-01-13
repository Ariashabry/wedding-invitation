import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Dashboard from '../components/dashboard/Dashboard';

const Layout = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-200">
                <Sidebar />
                <div className="p-4 xl:ml-80">
                    <Navbar />
                    <Dashboard />
                </div>
            </div>
        </>
    );
};

export default Layout;
