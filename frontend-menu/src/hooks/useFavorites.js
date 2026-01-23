// src/hooks/useFavorites.js
// Custom hook to manage favorite menu items
import { useState } from 'react';

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    if (!favorites.some(fav => fav.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (itemId) => {
    setFavorites(favorites.filter(fav => fav.id !== itemId));
  };

  const isFavorite = (itemId) => {
    return favorites.some(fav => fav.id === itemId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
