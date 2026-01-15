import React, { useState } from 'react';
import { X, Clock, Flame, Minus, Plus } from 'lucide-react';

const ItemModal = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-zoom-in">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white text-gray-800 transition-colors"><X size={20} /></button>
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }} />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col bg-white">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{item.name}</h2>
          <p className="text-2xl font-bold text-orange-600 mb-6">${Number(item.price).toFixed(2)}</p>
          <div className="prose prose-sm text-gray-500 mb-8 leading-relaxed flex-grow">{item.description}</div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><Clock className="text-orange-500" size={20} /><div><p className="text-xs text-gray-500 font-medium">Prep Time</p><p className="text-sm font-bold text-gray-900">{item.preparationTime} mins</p></div></div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><Flame className={item.spicyLevel > 0 ? "text-red-500" : "text-gray-300"} size={20} /><div><p className="text-xs text-gray-500 font-medium">Spiciness</p><p className="text-sm font-bold text-gray-900">{['None', 'Mild', 'Medium', 'Hot'][item.spicyLevel]}</p></div></div>
          </div>
          <div className="flex gap-4 mt-auto">
            <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 border border-gray-100">
               <button onClick={() => setQty(Math.max(1, qty-1))} className="text-gray-400 hover:text-black transition-colors"><Minus size={18}/></button>
               <span className="font-bold text-lg w-4 text-center">{qty}</span>
               <button onClick={() => setQty(qty+1)} className="text-gray-400 hover:text-black transition-colors"><Plus size={18}/></button>
            </div>
            <button className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20 active:scale-95 transform duration-100" onClick={() => { alert(`Added ${qty} ${item.name} to cart!`); onClose(); }}>Add - ${(item.price * qty).toFixed(2)}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemModal;