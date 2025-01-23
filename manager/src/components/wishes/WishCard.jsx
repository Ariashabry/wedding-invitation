import React from 'react';

const WishCard = ({ wish, onDelete }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-4">
                <blockquote className="text-gray-700 italic">
                    "{wish.message}"
                </blockquote>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    por <span className="font-medium">{wish.name}</span>
                </div>
                <button
                    onClick={onDelete}
                    className="text-red-600 hover:text-red-800 text-sm"
                >
                    Eliminar
                </button>
            </div>
            {wish.createdAt && (
                <div className="text-xs text-gray-500 mt-2">
                    {new Date(wish.createdAt).toLocaleDateString()}
                </div>
            )}
        </div>
    );
};

export default WishCard; 