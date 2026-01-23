import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

const FavoritesDrawer = ({ isOpen, onClose, favorites, onToggleFavorite, onAddToCart }) => {
  // Drawer එක Open වෙලා නැත්නම් මුකුත් පෙන්වන්නේ නෑ
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop - මේක Click කළාම Drawer එක වැහෙනවා */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Favorites</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {favorites.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <Heart size={64} className="opacity-20" />
              <p>No favorites yet</p>
              <button onClick={onClose} className="text-orange-500 font-bold hover:underline">
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                        <button onClick={() => onToggleFavorite(item)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                      <p className="text-orange-600 font-bold text-sm">${Number(item.price).toFixed(2)}</p>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                      onClick={() => { onAddToCart(item, 1); }}
                      className="mt-2 bg-gray-900 dark:bg-orange-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                    >
                      <ShoppingBag size={14} /> Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesDrawer;