import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Search, X, ChefHat, Star, Clock, Flame, ArrowRight, Minus, Plus, MapPin, Phone, Instagram, Facebook, Twitter, SlidersHorizontal, ChevronDown, Leaf, Wheat, ShoppingCart, Menu } from 'lucide-react';

const API_BASE = 'http://localhost:3001';

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
        setData([{ id: 'all', name: 'View All', icon: '🍽️' }, ...res.data]);
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

const Header = ({ restaurant, cartItemCount = 0 }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-bold text-lg hidden sm:block">
            {restaurant?.name || 'Restaurant'}
          </span>
        </div>

        {/* Cart Icon */}
        <button className="relative bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
          <ShoppingCart className="w-5 h-5 text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartItemCount > 9 ? '9+' : cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

const Hero = ({ restaurant, searchQuery, onSearchChange, isLoading }) => {
  if (isLoading) return <div className="h-[500px] bg-gray-100 animate-pulse w-full" />;
  
  return (
    <div className="relative h-[500px] w-full bg-gray-900 overflow-hidden flex items-center justify-center text-center px-4">
      <img 
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50" />

      <div className="relative z-10 max-w-3xl space-y-6 animate-fade-in">
        <div className="flex justify-center mb-4">
           <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl">
             <ChefHat className="w-12 h-12 text-white" />
           </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-sm">
          {restaurant?.name || "Welcome"}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
          {restaurant?.tagline || "Experience culinary excellence"}
        </p>
        
        <div className="pt-8 max-w-md mx-auto w-full">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/90 backdrop-blur-md border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all shadow-2xl text-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={22} />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')} 
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-colors"
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

const CategoryNav = ({ categories, activeCategory, onCategoryChange, isLoading }) => {
  return (
    <div className="sticky top-0 z-40 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50 py-4 transition-all">
      <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar px-4 sm:px-6">
        {isLoading ? (
          <div className="flex gap-4">
             {[1,2,3,4,5].map(i => <div key={i} className="h-12 w-28 bg-gray-200 rounded-full animate-pulse" />)}
          </div>
        ) : (
          <div className="flex gap-3 min-w-max mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`
                  group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border
                  ${activeCategory === cat.id 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20 scale-105' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'}
                `}
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Item Count */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{itemCount}</span>
            <span className="text-gray-500">
              {itemCount === 1 ? 'item' : 'items'} found
              {totalCount !== itemCount && (
                <span className="text-gray-400"> of {totalCount} total</span>
              )}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-orange-50 border-orange-200 text-orange-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <SlidersHorizontal size={18} />
              <span className="font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-gray-700 font-medium hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGE_OPTIONS.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => onPriceRangeChange(range.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        priceRange === range.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Dietary Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((diet) => {
                    const isActive = dietaryFilters.includes(diet.value);
                    const IconComponent = diet.icon;
                    return (
                      <button
                        key={diet.value}
                        onClick={() => onDietaryChange(diet.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? `${diet.bgActive} ${diet.textActive}`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent size={16} />
                        {diet.label}
                        {isActive && <X size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={onClearFilters}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
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
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {PRICE_RANGE_OPTIONS.find((r) => r.value === priceRange)?.label}
                <button onClick={() => onPriceRangeChange('all')} className="hover:text-gray-900">
                  <X size={14} />
                </button>
              </span>
            )}
            {dietaryFilters.map((diet) => {
              const config = DIETARY_OPTIONS.find((d) => d.value === diet);
              return (
                <span key={diet} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {config?.label}
                  <button onClick={() => onDietaryChange(diet)} className="hover:text-gray-900">
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
          <div key={n} className="h-96 rounded-3xl bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">No items found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onOpenModal(item)}
            className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col h-full"
          >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }} 
              />
              
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                 {item.popular && (
                   <span className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1.5">
                     <Star size={12} className="text-yellow-500 fill-yellow-500"/> Popular
                   </span>
                 )}
              </div>
              
              <div className="absolute bottom-4 right-4 bg-gray-900/95 backdrop-blur text-white px-4 py-2 rounded-full shadow-lg">
                <span className="font-bold tracking-wide">${Number(item.price).toFixed(2)}</span>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                  {item.name}
                </h3>
              </div>

              {/* Dietary Badges & Spicy Level */}
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                {/* Dietary Badges */}
                {item.dietary?.includes('vegetarian') && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <Leaf size={10} />
                    Vegetarian
                  </span>
                )}
                {item.dietary?.includes('vegan') && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    <Leaf size={10} />
                    Vegan
                  </span>
                )}
                {item.dietary?.includes('gluten-free') && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    <Wheat size={10} />
                    GF
                  </span>
                )}
                {/* Spicy Level Indicator */}
                {item.spicyLevel > 0 && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    {[...Array(item.spicyLevel)].map((_, i) => (
                      <Flame key={i} size={10} className="fill-red-500" />
                    ))}
                  </span>
                )}
              </div>
              
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                <div className="flex gap-2 text-xs font-medium text-gray-500">
                   <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md">
                     <Clock size={14}/> {item.preparationTime}m
                   </span>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  Add <ArrowRight size={16} />
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

const ItemModal = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');

  // Calculate total price
  const sizeModifier = SIZE_OPTIONS.find(s => s.id === selectedSize)?.priceModifier || 0;
  const unitPrice = Number(item.price) + sizeModifier;
  const totalPrice = unitPrice * qty;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-zoom-in my-8">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white text-gray-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-2/5 h-64 md:h-auto md:min-h-[500px] bg-gray-100">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }}
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col bg-white max-h-[80vh] md:max-h-none overflow-y-auto">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{item.name}</h2>
          </div>
          <p className="text-2xl font-bold text-orange-600 mb-4">
            ${Number(item.price).toFixed(2)}
            {sizeModifier > 0 && <span className="text-sm text-gray-400 font-normal ml-2">+ ${sizeModifier.toFixed(2)} size</span>}
          </p>
          
          <div className="text-gray-500 text-sm mb-6 leading-relaxed">
            {item.description}
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Choose Size</h4>
            <div className="flex gap-2">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
                    selectedSize === size.id
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>{size.label}</div>
                  <div className={`text-xs mt-0.5 ${selectedSize === size.id ? 'text-gray-300' : 'text-gray-400'}`}>
                    {size.priceModifier === 0 ? 'Base price' : `+$${size.priceModifier.toFixed(2)}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Item Info */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
               <Clock className="text-orange-500" size={20} />
               <div>
                 <p className="text-xs text-gray-500 font-medium">Prep Time</p>
                 <p className="text-sm font-bold text-gray-900">{item.preparationTime} mins</p>
               </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
               <Flame className={item.spicyLevel > 0 ? "text-red-500" : "text-gray-300"} size={20} />
               <div>
                 <p className="text-xs text-gray-500 font-medium">Spiciness</p>
                 <p className="text-sm font-bold text-gray-900">{['None', 'Mild', 'Medium', 'Hot'][item.spicyLevel]}</p>
               </div>
            </div>
          </div>

          {/* Order Summary */}
          {sizeModifier > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Your Selection</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Base ({SIZE_OPTIONS.find(s => s.id === selectedSize)?.label})</span>
                  <span>${(Number(item.price) + sizeModifier).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                  <span>Unit Price</span>
                  <span>${unitPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quantity and Add to Order */}
          <div className="flex gap-4 mt-auto">
            <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 border border-gray-100">
               <button onClick={() => setQty(Math.max(1, qty-1))} className="text-gray-400 hover:text-black transition-colors"><Minus size={18}/></button>
               <span className="font-bold text-lg w-4 text-center">{qty}</span>
               <button onClick={() => setQty(qty+1)} className="text-gray-400 hover:text-black transition-colors"><Plus size={18}/></button>
            </div>
            <button 
              className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20 active:scale-95 transform duration-100"
              onClick={() => { 
                const sizeLabel = SIZE_OPTIONS.find(s => s.id === selectedSize)?.label;
                alert(`Added ${qty} ${sizeLabel} ${item.name} to cart!`); 
                onClose(); 
              }}
            >
              Add to Order - ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ restaurant }) => (
  <footer className="bg-gray-900 text-white py-16 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">{restaurant?.name || "Restaurant"}</h3>
        <p className="text-gray-400 leading-relaxed max-w-xs">{restaurant?.description}</p>
        <div className="flex gap-4 pt-4">
           {[Instagram, Facebook, Twitter].map((Icon, i) => (
             <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
               <Icon size={18} />
             </a>
           ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-lg mb-6 text-gray-200">Contact</h4>
        <div className="space-y-4 text-gray-400">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 shrink-0 text-orange-500" size={18} />
            <span>{restaurant?.address || "123 Flavor Street"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="shrink-0 text-orange-500" size={18} />
            <span>{restaurant?.phone}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-6 text-gray-200">Opening Hours</h4>
        <div className="space-y-2 text-gray-400">
          <p>{restaurant?.hours || "Mon - Sun: 9am - 10pm"}</p>
          <p className="text-sm text-gray-500 mt-4">Happy Hour: 4pm - 7pm</p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
      © 2024 {restaurant?.name}. All rights reserved.
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  
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

  // Price range definitions
  const priceRanges = {
    'all': { min: 0, max: Infinity },
    'budget': { min: 0, max: 10 },
    'mid': { min: 10, max: 20 },
    'premium': { min: 20, max: 30 },
    'luxury': { min: 30, max: Infinity },
  };

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
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      <Header restaurant={restaurant} cartItemCount={0} />
      
      <Hero 
        restaurant={restaurant}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isLoading={isLoadingRestaurant}
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

      <MenuGrid 
        items={filteredAndSortedItems}
        isLoading={isLoadingItems}
        onOpenModal={handleOpenModal}
      />

      <Footer restaurant={restaurant} />

      <ItemModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default App;