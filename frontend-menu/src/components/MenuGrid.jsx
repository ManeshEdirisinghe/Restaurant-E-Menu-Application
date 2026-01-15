import React from 'react';
import { Search, Star, Clock, Flame, ArrowRight } from 'lucide-react';

const MenuGrid = ({ items, isLoading, onOpenModal }) => {
  if (isLoading) return <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{[1, 2, 3].map(n => <div key={n} className="h-96 rounded-3xl bg-gray-200 animate-pulse" />)}</div>;
  if (items.length === 0) return <div className="py-24 text-center"><div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"><Search className="w-8 h-8 text-gray-400" /></div><h3 className="text-xl font-semibold text-gray-900">No items found</h3></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} onClick={() => onOpenModal(item)} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col h-full">
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }} />
              <div className="absolute top-4 left-4">{item.popular && <span className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1.5"><Star size={12} className="text-yellow-500 fill-yellow-500"/> Popular</span>}</div>
              <div className="absolute bottom-4 right-4 bg-gray-900/95 backdrop-blur text-white px-4 py-2 rounded-full shadow-lg"><span className="font-bold tracking-wide">${Number(item.price).toFixed(2)}</span></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight mb-3">{item.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">{item.description}</p>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                <div className="flex gap-4 text-xs font-medium text-gray-500">
                   <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md"><Clock size={14}/> {item.preparationTime}m</span>
                   {item.spicyLevel > 0 && <span className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-md"><Flame size={14}/> {item.spicyLevel}/3</span>}
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Add <ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MenuGrid;