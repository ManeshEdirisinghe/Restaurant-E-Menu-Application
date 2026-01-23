import React from 'react';
import { Search, Star, Clock, Flame, ArrowRight, Leaf, Wheat, Heart } from 'lucide-react';

// මෙතන අලුතින් props එකතු වුනා: favorites, onToggleFavorite
const MenuGrid = ({ items, isLoading, onOpenModal, favorites = [], onToggleFavorite }) => {
  
  // Item එකක් Favorite ද කියලා බලන function එක
  const isFavorite = (itemId) => favorites.some(fav => fav.id === itemId);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-96 rounded-3xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24 text-center px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">No items found</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenModal(item)}
            className="group bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/30 sm:hover:-translate-y-1 transition-all duration-300 sm:duration-500 cursor-pointer flex flex-col h-full active:scale-[0.98] sm:active:scale-100"
          >
            {/* Image Section */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }}
              />

              {/* Heart Button (අලුත් කොටස) */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Card click එක නවත්වන්න
                  onToggleFavorite(item);
                }}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:scale-110 active:scale-95 transition-all shadow-sm"
              >
                <Heart 
                  size={20} 
                  className={`transition-colors ${isFavorite(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-white'}`} 
                />
              </button>

              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
                {item.popular && (
                  <span className="bg-white/95 backdrop-blur px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1 sm:gap-1.5">
                    <Star size={10} className="text-yellow-500 fill-yellow-500 sm:w-3 sm:h-3" /> Popular
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-gray-900/95 backdrop-blur text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                <span className="font-bold tracking-wide text-sm sm:text-base">${Number(item.price).toFixed(2)}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight">
                  {item.name}
                </h3>
              </div>

              {/* Dietary Badges */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                {item.dietary?.includes('vegetarian') && (
                  <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-700">
                    <Leaf size={8} className="sm:w-[10px] sm:h-[10px]" /> <span className="hidden xs:inline">Veg</span>
                  </span>
                )}
                {item.spicyLevel > 0 && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-red-100 text-red-700">
                    {[...Array(item.spicyLevel)].map((_, i) => (
                      <Flame key={i} size={8} className="fill-red-500 sm:w-[10px] sm:h-[10px]" />
                    ))}
                  </span>
                )}
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4 flex-grow">
                {item.description}
              </p>

              <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-700 pt-3 sm:pt-4 mt-auto">
                <div className="flex gap-2 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1 sm:gap-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 sm:px-2.5 py-1 rounded-md">
                    <Clock size={12} className="sm:w-[14px] sm:h-[14px]" /> {item.preparationTime}m
                  </span>
                </div>
                <button className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors min-h-[32px] px-2">
                  Add <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;