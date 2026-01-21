import React, { useState, useEffect } from 'react';
import { X, Clock, Flame, Minus, Plus } from 'lucide-react';

// SIZE_OPTIONS අර්ථ දක්වමු (ඔයාගේ මුල් කෝඩ් එකේ තිබුණා වගේ)
const SIZE_OPTIONS = [
  { id: 'small', label: 'Small', priceModifier: 0 },
  { id: 'medium', label: 'Medium', priceModifier: 2 },
  { id: 'large', label: 'Large', priceModifier: 4 },
];
const ItemModal = ({ item, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !item) return null;
  
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');

  // Modal එක open වෙන හැම පාරම qty එක 1 ට reset කරන්න
  useEffect(() => {
    if (isOpen) {
      setQty(1);
      setSelectedSize('medium');
    }
  }, [isOpen, item]);

  // මිල ගණනය කිරීම
  const sizeModifier = SIZE_OPTIONS.find(s => s.id === selectedSize)?.priceModifier || 0;
  const unitPrice = Number(item.price) + sizeModifier;
  const totalPrice = unitPrice * qty;

  // Add to Cart Button Click කළාම මෙය ක්‍රියාත්මක වේ
  const handleAddToCart = () => {
    // තෝරාගත් Item එක, ප්‍රමාණය (Size) සහ ගණන (Qty) සමග Cart එකට යැවීම
    const itemToAdd = {
      ...item,
      selectedSize,
      price: unitPrice, // ප්‍රමාණය අනුව වෙනස් වූ මිල
      basePrice: item.price // මුල් මිල
    };
    
    onAddToCart(itemToAdd, qty);
    onClose(); // Modal එක වහන්න
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-zoom-in max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-48 md:h-auto bg-gray-100">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' }} 
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{item.description}</p>
          
          {/* Size Selector */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Select Size</h4>
            <div className="flex gap-2">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all
                    ${selectedSize === size.id 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200'}`}
                >
                  {size.label} (+${size.priceModifier})
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
               <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2 border border-gray-100 dark:border-gray-600">
                 <button onClick={() => setQty(Math.max(1, qty-1))} className="p-1 hover:text-orange-500 dark:text-white"><Minus size={16}/></button>
                 <span className="font-bold text-lg w-6 text-center dark:text-white">{qty}</span>
                 <button onClick={() => setQty(qty+1)} className="p-1 hover:text-orange-500 dark:text-white"><Plus size={16}/></button>
              </div>
              <div className="text-right flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Price</p>
                <p className="text-xl font-bold text-orange-600">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="w-full bg-gray-900 dark:bg-orange-600 text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-orange-500 transition-colors shadow-lg active:scale-[0.98]"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;