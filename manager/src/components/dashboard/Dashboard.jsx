import GuestStats from './GuestStats';
import GuestTables from './GuestTables';

const Dashboard = () => {
    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </div>
            <GuestStats />
            <GuestTables />
        </div>
    );
};

export default Dashboard; 