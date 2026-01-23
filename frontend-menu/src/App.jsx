import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Search, X, ChefHat, Star, Clock, Flame, ArrowRight, Minus, Plus, MapPin, Phone, Instagram, Facebook, Twitter, SlidersHorizontal, ChevronDown, Leaf, Wheat, ShoppingCart, Menu, Moon, Sun } from 'lucide-react';
import { useCart } from './hooks/useCart';
import CartDrawer from './components/CartDrawer';
const API_BASE = 'http://localhost:3001';
import CategoryNav from './components/CategoryNav';
import ItemModal from './components/ItemModal';
// import { Toaster } from 'react-hot-toast';
import Toast from './components/Toast';
import { useFavorites } from './hooks/useFavorites';
import FavoritesDrawer from './components/FavoritesDrawer';


// --- HOOKS ---

// Prevents search from firing on every keystroke
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Dark mode hook with localStorage persistence
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return { isDarkMode, toggleDarkMode };
}

const useRestaurant = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/restaurant`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
};

const useCategories = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/categories`)
      .then(res => {
        // Prepend "All" option manually
        setData([{ id: 'all', name: 'View All' }, ...res.data]);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
};

const useMenuItems = (filters) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        let url = `${API_BASE}/menuItems`;
        const params = {};

        // Handle filtering
        if (filters.category && filters.category !== 'all') {
          params.category = filters.category;
        }
        if (filters.search) {
          params.q = filters.search;
        }

        const res = await axios.get(url, { params });
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [filters.category, filters.search]);

  return { data, isLoading };
};

// --- COMPONENTS ---



const Header = ({ restaurant, cartItemCount, isDarkMode, onToggleDarkMode, onOpenCart, onOpenFavorites, favoritesCount }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-white/10 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/20">
            <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-white font-bold text-base sm:text-lg hidden sm:block truncate max-w-[150px] md:max-w-none">
            {restaurant?.name || 'Restaurant'}
          </span>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Dark Mode */}
          <button
            onClick={onToggleDarkMode}
            className="relative bg-white/10 backdrop-blur-md min-w-[44px] min-h-[44px] p-2.5 sm:p-3 rounded-xl border border-white/20 hover:bg-white/20 active:bg-white/30 transition-colors flex items-center justify-center"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-white" />}
          </button>

          {/* Favorites Icon (New) */}
          <button
            onClick={onOpenFavorites}
            className="relative bg-white/10 backdrop-blur-md min-w-[44px] min-h-[44px] p-2.5 sm:p-3 rounded-xl border border-white/20 hover:bg-white/20 active:bg-white/30 transition-colors flex items-center justify-center"
          >
            <Heart className="w-5 h-5 text-white" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ShoppingCart size={24} className="text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ restaurant, searchQuery, onSearchChange, isLoading }) => {
  if (isLoading) return <div className="h-[350px] sm:h-[400px] md:h-[500px] bg-gray-100 animate-pulse w-full" />;

  return (
    <div className="relative h-[350px] sm:h-[400px] md:h-[500px] w-full bg-gray-900 overflow-hidden flex items-center justify-center text-center px-4 pt-16 sm:pt-20">
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50" />

      <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4 md:space-y-6 animate-fade-in px-2">
        <div className="flex justify-center mb-2 sm:mb-4">
          <div className="bg-white/10 backdrop-blur-md p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl">
            <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-sm leading-tight">
          {restaurant?.name || "Welcome"}
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed px-2">
          {restaurant?.tagline || "Experience culinary excellence"}
        </p>

        <div className="pt-4 sm:pt-6 md:pt-8 max-w-md mx-auto w-full px-2">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all shadow-2xl text-base sm:text-lg"
            />
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-1 hover:bg-gray-100 active:bg-gray-200 rounded-full text-gray-400 hover:text-black transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// const CategoryNav = ({ categories, activeCategory, onCategoryChange, isLoading }) => {
//   return (
//     <div className="sticky top-0 z-40 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50 py-3 sm:py-4 transition-all">
//       <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar px-3 sm:px-6 -mx-1">
//         {isLoading ? (
//           <div className="flex gap-2 sm:gap-4">
//             {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 sm:h-12 w-24 sm:w-28 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />)}
//           </div>
//         ) : (
//           <div className="flex gap-2 sm:gap-3 min-w-max px-1">
//             {categories.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => onCategoryChange(cat.id)}
//                 className={`
//                   group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border flex-shrink-0 min-h-[40px] sm:min-h-[44px] active:scale-95
//                   ${activeCategory === cat.id
//                     ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-lg shadow-gray-900/20 dark:shadow-white/10'
//                     : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600'}
//                 `}
//               >
//                 <span className="text-base sm:text-lg">{cat.icon}</span>
//                 <span className="whitespace-nowrap">{cat.name}</span>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// --- FILTER BAR COMPONENT ---
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'popular', label: 'Most Popular' },
];

const DIETARY_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian', icon: Leaf, bgActive: 'bg-green-100', textActive: 'text-green-700' },
  { value: 'vegan', label: 'Vegan', icon: Leaf, bgActive: 'bg-emerald-100', textActive: 'text-emerald-700' },
  { value: 'gluten-free', label: 'Gluten-Free', icon: Wheat, bgActive: 'bg-amber-100', textActive: 'text-amber-700' },
];

const PRICE_RANGE_OPTIONS = [
  { value: 'all', label: 'All Prices' },
  { value: 'budget', label: 'Under $10' },
  { value: 'mid', label: '$10 - $20' },
  { value: 'premium', label: '$20 - $30' },
  { value: 'luxury', label: 'Over $30' },
];

const FilterBar = ({
  itemCount,
  totalCount,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  dietaryFilters,
  onDietaryChange,
  onClearFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const hasActiveFilters = priceRange !== 'all' || dietaryFilters.length > 0;
  const activeFilterCount = (priceRange !== 'all' ? 1 : 0) + dietaryFilters.length;

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          {/* Item Count */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{itemCount}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              {itemCount === 1 ? 'item' : 'items'}
              <span className="hidden xs:inline"> found</span>
              {totalCount !== itemCount && (
                <span className="text-gray-400 hidden sm:inline"> of {totalCount}</span>
              )}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Filter button - Touch-friendly */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border transition-all min-h-[44px] active:scale-95 ${showFilters || hasActiveFilters
                ? 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-400'
                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 active:bg-gray-50 dark:active:bg-gray-600'
                }`}
            >
              <SlidersHorizontal size={18} />
              <span className="font-medium text-sm sm:text-base hidden xs:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort dropdown - Touch-friendly */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer min-h-[44px]"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFilters && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Price Range</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {PRICE_RANGE_OPTIONS.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => onPriceRangeChange(range.value)}
                      className={`px-3 sm:px-4 py-2 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all min-h-[40px] active:scale-95 ${priceRange === range.value
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500'
                        }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Dietary Preferences</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {DIETARY_OPTIONS.map((diet) => {
                    const isActive = dietaryFilters.includes(diet.value);
                    const IconComponent = diet.icon;
                    return (
                      <button
                        key={diet.value}
                        onClick={() => onDietaryChange(diet.value)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all min-h-[40px] active:scale-95 ${isActive
                          ? `${diet.bgActive} ${diet.textActive}`
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500'
                          }`}
                      >
                        <IconComponent size={14} />
                        <span className="hidden xs:inline">{diet.label}</span>
                        <span className="xs:hidden">{diet.label.split('-')[0]}</span>
                        {isActive && <X size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={onClearFilters}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700 active:text-orange-800 flex items-center gap-1 min-h-[44px] px-2"
                >
                  <X size={16} />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Filter Tags */}
        {!showFilters && hasActiveFilters && (
          <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Active:</span>
            {priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                {PRICE_RANGE_OPTIONS.find((r) => r.value === priceRange)?.label}
                <button onClick={() => onPriceRangeChange('all')} className="hover:text-gray-900 dark:hover:text-white p-0.5">
                  <X size={14} />
                </button>
              </span>
            )}
            {dietaryFilters.map((diet) => {
              const config = DIETARY_OPTIONS.find((d) => d.value === diet);
              return (
                <span key={diet} className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                  {config?.label}
                  <button onClick={() => onDietaryChange(diet)} className="hover:text-gray-900 dark:hover:text-white">
                    <X size={14} />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const MenuGrid = ({ items, isLoading, onOpenModal }) => {
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

              {/* Dietary Badges & Spicy Level */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                {/* Dietary Badges */}
                {item.dietary?.includes('vegetarian') && (
                  <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-700">
                    <Leaf size={8} className="sm:w-[10px] sm:h-[10px]" />
                    <span className="hidden xs:inline">Vegetarian</span>
                    <span className="xs:hidden">Veg</span>
                  </span>
                )}
                {item.dietary?.includes('vegan') && (
                  <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-emerald-100 text-emerald-700">
                    <Leaf size={8} className="sm:w-[10px] sm:h-[10px]" />
                    Vegan
                  </span>
                )}
                {item.dietary?.includes('gluten-free') && (
                  <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-amber-100 text-amber-700">
                    <Wheat size={8} className="sm:w-[10px] sm:h-[10px]" />
                    GF
                  </span>
                )}
                {/* Spicy Level Indicator */}
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

// Size and Add-on options configuration
const SIZE_OPTIONS = [
  { id: 'small', label: 'Small', priceModifier: 0 },
  { id: 'medium', label: 'Medium', priceModifier: 2 },
  { id: 'large', label: 'Large', priceModifier: 4 },
];

// const ItemModal = ({ item, isOpen, onClose }) => {
//   if (!isOpen || !item) return null;
//   const [qty, setQty] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('medium');

//   // Calculate total price
//   const sizeModifier = SIZE_OPTIONS.find(s => s.id === selectedSize)?.priceModifier || 0;
//   const unitPrice = Number(item.price) + sizeModifier;
//   const totalPrice = unitPrice * qty;

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 overflow-y-auto">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal Card - Full width on mobile, centered on larger screens */}
//       <div className="relative bg-white dark:bg-gray-800 w-full sm:max-w-2xl lg:max-w-3xl sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-zoom-in sm:my-8 max-h-[95vh] sm:max-h-[90vh]">

//         {/* Close button - Touch-friendly */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2.5 sm:p-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
//         >
//           <X size={22} />
//         </button>

//         {/* Image Side */}
//         <div className="w-full md:w-2/5 h-48 sm:h-56 md:h-auto md:min-h-[500px] bg-gray-100 dark:bg-gray-700 flex-shrink-0">
//           <img
//             src={item.image}
//             alt={item.name}
//             className="w-full h-full object-cover"
//             onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }}
//           />
//         </div>

//         {/* Content Side */}
//         <div className="w-full md:w-3/5 p-4 sm:p-6 md:p-8 flex flex-col bg-white dark:bg-gray-800 overflow-y-auto flex-1">
//           <div className="flex items-start justify-between mb-2">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{item.name}</h2>
//           </div>
//           <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
//             ${Number(item.price).toFixed(2)}
//             {sizeModifier > 0 && <span className="text-sm text-gray-400 dark:text-gray-500 font-normal ml-2">+ ${sizeModifier.toFixed(2)} size</span>}
//           </p>

//           <div className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
//             {item.description}
//           </div>

//           {/* Size Selection */}
//           <div className="mb-4 sm:mb-6">
//             <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Choose Size</h4>
//             <div className="flex gap-2">
//               {SIZE_OPTIONS.map((size) => (
//                 <button
//                   key={size.id}
//                   onClick={() => setSelectedSize(size.id)}
//                   className={`flex-1 py-3 sm:py-3 px-2 sm:px-4 rounded-xl text-sm font-medium transition-all border min-h-[56px] active:scale-95 ${selectedSize === size.id
//                     ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
//                     : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 active:bg-gray-50 dark:active:bg-gray-600'
//                     }`}
//                 >
//                   <div className="text-sm sm:text-base">{size.label}</div>
//                   <div className={`text-xs mt-0.5 ${selectedSize === size.id ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400 dark:text-gray-500'}`}>
//                     {size.priceModifier === 0 ? 'Base' : `+$${size.priceModifier.toFixed(2)}`}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Item Info */}
//           <div className="grid grid-cols-2 gap-3 mb-6">
//             <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-100 dark:border-gray-600">
//               <Clock className="text-orange-500" size={20} />
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Prep Time</p>
//                 <p className="text-sm font-bold text-gray-900 dark:text-white">{item.preparationTime} mins</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-100 dark:border-gray-600">
//               <Flame className={item.spicyLevel > 0 ? "text-red-500" : "text-gray-300 dark:text-gray-500"} size={20} />
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Spiciness</p>
//                 <p className="text-sm font-bold text-gray-900 dark:text-white">{['None', 'Mild', 'Medium', 'Hot'][item.spicyLevel]}</p>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           {sizeModifier > 0 && (
//             <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-600">
//               <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Your Selection</h4>
//               <div className="space-y-1 text-sm">
//                 <div className="flex justify-between text-gray-600 dark:text-gray-300">
//                   <span>Base ({SIZE_OPTIONS.find(s => s.id === selectedSize)?.label})</span>
//                   <span>${(Number(item.price) + sizeModifier).toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
//                   <span>Unit Price</span>
//                   <span>${unitPrice.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Quantity and Add to Order */}
//           <div className="flex gap-2 sm:gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl px-3 sm:px-4 border border-gray-100 dark:border-gray-600">
//               <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white active:text-orange-500 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"><Minus size={20} /></button>
//               <span className="font-bold text-lg w-6 text-center text-gray-900 dark:text-white">{qty}</span>
//               <button onClick={() => setQty(qty + 1)} className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white active:text-orange-500 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"><Plus size={20} /></button>
//             </div>
//             <button
//               className="flex-1 bg-gray-900 dark:bg-orange-600 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-gray-800 dark:hover:bg-orange-500 transition-colors shadow-lg shadow-gray-900/20 dark:shadow-orange-600/30 active:scale-[0.98] transform duration-100 min-h-[52px]"
//               onClick={() => {
//                 const sizeLabel = SIZE_OPTIONS.find(s => s.id === selectedSize)?.label;
//                 alert(`Added ${qty} ${sizeLabel} ${item.name} to cart!`);
//                 onClose();
//               }}
//             >
//               Add - ${totalPrice.toFixed(2)}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Footer = ({ restaurant }) => (
  <footer className="bg-gray-900 text-white py-10 sm:py-12 md:py-16 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
      <div className="space-y-4 text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{restaurant?.name || "Restaurant"}</h3>
        <p className="text-gray-400 leading-relaxed max-w-xs mx-auto sm:mx-0 text-sm sm:text-base">{restaurant?.description}</p>
        <div className="flex gap-3 sm:gap-4 pt-4 justify-center sm:justify-start">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 active:bg-orange-600 transition-colors">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="text-center sm:text-left">
        <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-200">Contact</h4>
        <div className="space-y-3 sm:space-y-4 text-gray-400 text-sm sm:text-base">
          <div className="flex items-start gap-3 justify-center sm:justify-start">
            <MapPin className="mt-0.5 shrink-0 text-orange-500" size={18} />
            <span>{restaurant?.address || "123 Reid Avenue, Colombo"}</span>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <Phone className="shrink-0 text-orange-500" size={18} />
            <span>{restaurant?.phone || "+94 11-22-00-000"}</span>
          </div>
        </div>
      </div>

      <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
        <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-200">Opening Hours</h4>
        <div className="space-y-2 text-gray-400 text-sm sm:text-base">
          <p>{restaurant?.hours || "Mon - Sun: 9am - 10pm"}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-4">Happy Hour: 4pm - 7pm</p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-white/10 text-center text-gray-500 text-xs sm:text-sm">
      © 2024 {restaurant?.name}. All rights reserved.
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---


function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  // New filter states
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [dietaryFilters, setDietaryFilters] = useState([]);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: restaurant, isLoading: isLoadingRestaurant } = useRestaurant();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  const filters = useMemo(() => ({
    category: activeCategory,
    search: debouncedSearch,
  }), [activeCategory, debouncedSearch]);

  const { data: menuItems = [], isLoading: isLoadingItems } = useMenuItems(filters);

  const handleAddToCartWithToast = (item, qty) => {
    addToCart(item, qty);

    setToastMsg(`Added ${qty} ${item.name} to order!`);
    setShowToast(true);
  };

  // Price range definitions
  const priceRanges = {
    'all': { min: 0, max: Infinity },
    'budget': { min: 0, max: 10 },
    'mid': { min: 10, max: 20 },
    'premium': { min: 20, max: 30 },
    'luxury': { min: 30, max: Infinity },
  };

  const {
    favorites,
    toggleFavorite,
    isFavDrawerOpen,
    setIsFavDrawerOpen
  } = useFavorites();

  // Apply client-side filtering and sorting
  const filteredAndSortedItems = useMemo(() => {
    let result = [...menuItems];

    // Apply price range filter
    if (priceRange !== 'all') {
      const { min, max } = priceRanges[priceRange];
      result = result.filter(item => item.price >= min && item.price < max);
    }

    // Apply dietary filters
    if (dietaryFilters.length > 0) {
      result = result.filter(item =>
        dietaryFilters.every(diet => item.dietary?.includes(diet))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'popular':
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [menuItems, priceRange, dietaryFilters, sortBy]);

  // Handlers
  const handleCategoryChange = useCallback((id) => setActiveCategory(id), []);
  const handleSearchChange = useCallback((val) => setSearchQuery(val), []);
  const handleOpenModal = useCallback((item) => setSelectedItem(item), []);
  const handleCloseModal = useCallback(() => setSelectedItem(null), []);

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQty,
    cartTotal,
    cartCount
  } = useCart();

  // Dark mode
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // New filter handlers
  const handleSortChange = useCallback((val) => setSortBy(val), []);
  const handlePriceRangeChange = useCallback((val) => setPriceRange(val), []);
  const handleDietaryChange = useCallback((diet) => {
    setDietaryFilters(prev =>
      prev.includes(diet)
        ? prev.filter(d => d !== diet)
        : [...prev, diet]
    );
  }, []);
  const handleClearFilters = useCallback(() => {
    setPriceRange('all');
    setDietaryFilters([]);
    setSortBy('default');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 dark:selection:bg-orange-900 dark:selection:text-orange-100 flex flex-col transition-colors duration-300">
      <Header
        restaurant={restaurant}
        cartItemCount={cartCount}
        favoritesCount={favorites.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavDrawerOpen(true)}
      />

      <Hero
        restaurant={restaurant}
        cartItemCount={cartCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isLoading={isLoadingCategories}
      />

      <FilterBar
        itemCount={filteredAndSortedItems.length}
        totalCount={menuItems.length}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        priceRange={priceRange}
        onPriceRangeChange={handlePriceRangeChange}
        dietaryFilters={dietaryFilters}
        onDietaryChange={handleDietaryChange}
        onClearFilters={handleClearFilters}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        total={cartTotal}
      />

      <FavoritesDrawer
        isOpen={isFavDrawerOpen}
        onClose={() => setIsFavDrawerOpen(false)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onAddToCart={handleAddToCartWithToast}
      />

      <MenuGrid
        items={filteredAndSortedItems}
        isLoading={isLoadingItems}
        onOpenModal={handleOpenModal}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      <Footer restaurant={restaurant} />

      {/* <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} /> */}

      <Toast
        message={toastMsg}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <ItemModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCartWithToast}
      />


    </div >
  );
}

export default App;
