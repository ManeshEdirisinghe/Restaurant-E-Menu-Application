// src/components/FavoritesDrawer.jsx
import React from 'react';
import useFavorites from '../hooks/useFavorites';

export default function FavoritesDrawer({ isOpen, onClose }) {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      aria-hidden={!isOpen}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Favorites</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorite items yet.</p>
        ) : (
          <ul>
            {favorites.map(item => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="block text-sm text-gray-400">{item.category}</span>
                </div>
                <button
                  onClick={() => removeFavorite(item.id)}
                  className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
