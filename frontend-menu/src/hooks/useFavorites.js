import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isFavDrawerOpen, setIsFavDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === item.id);
      if (exists) {
        // දැනටමත් තියෙනවා නම් අයින් කරනවා (Remove)
        return prev.filter((fav) => fav.id !== item.id);
      } else {
        // නැත්නම් අලුතින් එකතු කරනවා (Add)
        return [...prev, item];
      }
    });
  };

  const isFavorite = (itemId) => {
    return favorites.some((fav) => fav.id === itemId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isFavDrawerOpen,
    setIsFavDrawerOpen
  };
}