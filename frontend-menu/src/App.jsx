import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Search, X, ChefHat, Star, Clock, Flame, ArrowRight, Minus, Plus, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

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
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                  {item.name}
                </h3>
              </div>
              
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                <div className="flex gap-4 text-xs font-medium text-gray-500">
                   <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md">
                     <Clock size={14}/> {item.preparationTime}m
                   </span>
                   {item.spicyLevel > 0 && (
                     <span className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-md">
                       <Flame size={14}/> {item.spicyLevel}/3
                     </span>
                   )}
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

const ItemModal = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-zoom-in">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white text-gray-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }}
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col bg-white">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{item.name}</h2>
          </div>
          <p className="text-2xl font-bold text-orange-600 mb-6">${Number(item.price).toFixed(2)}</p>
          
          <div className="prose prose-sm text-gray-500 mb-8 leading-relaxed flex-grow">
            {item.description}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
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

          <div className="flex gap-4 mt-auto">
            <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 border border-gray-100">
               <button onClick={() => setQty(Math.max(1, qty-1))} className="text-gray-400 hover:text-black transition-colors"><Minus size={18}/></button>
               <span className="font-bold text-lg w-4 text-center">{qty}</span>
               <button onClick={() => setQty(qty+1)} className="text-gray-400 hover:text-black transition-colors"><Plus size={18}/></button>
            </div>
            <button 
              className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20 active:scale-95 transform duration-100"
              onClick={() => { alert(`Added ${qty} ${item.name} to cart!`); onClose(); }}
            >
              Add to Order - ${(item.price * qty).toFixed(2)}
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

  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const { data: restaurant, isLoading: isLoadingRestaurant } = useRestaurant();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  
  const filters = useMemo(() => ({
    category: activeCategory,
    search: debouncedSearch,
  }), [activeCategory, debouncedSearch]);

  const { data: menuItems = [], isLoading: isLoadingItems } = useMenuItems(filters);

  // Handlers
  const handleCategoryChange = useCallback((id) => setActiveCategory(id), []);
  const handleSearchChange = useCallback((val) => setSearchQuery(val), []);
  const handleOpenModal = useCallback((item) => setSelectedItem(item), []);
  const handleCloseModal = useCallback(() => setSelectedItem(null), []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col">
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

      <MenuGrid 
        items={menuItems}
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