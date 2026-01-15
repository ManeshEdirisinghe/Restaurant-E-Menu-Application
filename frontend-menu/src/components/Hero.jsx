import React from 'react';
import { Search, X, ChefHat } from 'lucide-react';

const Hero = ({ restaurant, searchQuery, onSearchChange, isLoading }) => {
  if (isLoading) return <div className="h-[500px] bg-gray-100 animate-pulse w-full" />;
  
  return (
    <div className="relative h-[500px] w-full bg-gray-900 overflow-hidden flex items-center justify-center text-center px-4">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50" />
      <div className="relative z-10 max-w-3xl space-y-6 animate-fade-in">
        <div className="flex justify-center mb-4"><div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl"><ChefHat className="w-12 h-12 text-white" /></div></div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-sm">{restaurant?.name || "Welcome"}</h1>
        <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">{restaurant?.tagline || "Experience culinary excellence"}</p>
        <div className="pt-8 max-w-md mx-auto w-full">
          <div className="relative group">
            <input type="text" placeholder="Search for dishes..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/90 backdrop-blur-md border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all shadow-2xl text-lg" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={22} />
            {searchQuery && <button onClick={() => onSearchChange('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-colors"><X size={18} /></button>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;