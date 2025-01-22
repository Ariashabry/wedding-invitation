import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const menuItems = [
        { path: '/', label: 'Dashboard' },
        { path: '/guests', label: 'Invitados' },
        { path: '/wishes', label: 'Deseos' },
        { path: '/settings', label: 'Configuración' }
    ];

    return (
        <>
            {/* Botón de menú flotante (visible cuando el sidebar está cerrado) */}
            <button 
                className={`lg:hidden fixed top-6 left-6 z-50 p-2 rounded-md bg-white shadow-md ${
                    isOpen ? 'hidden' : 'block'
                }`}
                onClick={() => setIsOpen(true)}
            >
                <svg 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 6h16M4 12h16M4 18h16" 
                    />
                </svg>
                <span className="sr-only">Abrir menú</span>
            </button>

            {/* Overlay para móvil */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform lg:translate-x-0 lg:static lg:z-auto ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="h-full flex flex-col">
                    {/* Header del Sidebar */}
                    <div className="flex items-center justify-between px-6 h-20 border-b border-gray-200">
                        <h1 className="text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                            WeddingManager
                        </h1>
                        {/* Botón de cerrar (visible cuando el sidebar está abierto) */}
                        <button 
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navegación */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {menuItems.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center px-4 py-3 text-base rounded-md transition-colors
                                    ${isActive 
                                        ? 'bg-blue-50 text-blue-700 font-medium' 
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }
                                `}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar; 