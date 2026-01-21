import React, { useState, useEffect } from 'react';
import { X, Clock, Flame, Minus, Plus } from 'lucide-react';

// Size and Add-on options configuration
const SIZE_OPTIONS = [
  { id: 'small', label: 'Small', priceModifier: 0 },
  { id: 'medium', label: 'Medium', priceModifier: 2 },
  { id: 'large', label: 'Large', priceModifier: 4 },
];

const ItemModal = ({ item, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !item) return null;
  
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');

  // Modal එක open වෙනකොට reset කරන්න
  useEffect(() => {
    if (isOpen) {
      setQty(1);
      setSelectedSize('medium');
    }
  }, [isOpen, item]);

  // Calculate total price
  const sizeModifier = SIZE_OPTIONS.find(s => s.id === selectedSize)?.priceModifier || 0;
  const unitPrice = Number(item.price) + sizeModifier;
  const totalPrice = unitPrice * qty;

  // Add to Cart Logic (මේක තමයි අපි අලුතින් දැම්මේ)
  const handleAddToCart = () => {
    const itemToAdd = {
      ...item,
      selectedSize,
      price: unitPrice, // Size එක අනුව වෙනස් වුනු මිල
      basePrice: item.price
    };

    if (onAddToCart) {
      onAddToCart(itemToAdd, qty);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card - පරණ ලස්සන Design එක */}
      <div className="relative bg-white dark:bg-gray-800 w-full sm:max-w-2xl lg:max-w-3xl sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-zoom-in sm:my-8 max-h-[95vh] sm:max-h-[90vh]">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2.5 sm:p-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X size={22} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-2/5 h-48 sm:h-56 md:h-auto md:min-h-[500px] bg-gray-100 dark:bg-gray-700 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }}
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-3/5 p-4 sm:p-6 md:p-8 flex flex-col bg-white dark:bg-gray-800 overflow-y-auto flex-1">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{item.name}</h2>
          </div>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
            ${Number(item.price).toFixed(2)}
            {sizeModifier > 0 && <span className="text-sm text-gray-400 dark:text-gray-500 font-normal ml-2">+ ${sizeModifier.toFixed(2)} size</span>}
          </p>

          <div className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
            {item.description}
          </div>

          {/* Size Selection (Old Style) */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Choose Size</h4>
            <div className="flex gap-2">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`flex-1 py-3 sm:py-3 px-2 sm:px-4 rounded-xl text-sm font-medium transition-all border min-h-[56px] active:scale-95 ${selectedSize === size.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 active:bg-gray-50 dark:active:bg-gray-600'
                    }`}
                >
                  <div className="text-sm sm:text-base">{size.label}</div>
                  <div className={`text-xs mt-0.5 ${selectedSize === size.id ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400 dark:text-gray-500'}`}>
                    {size.priceModifier === 0 ? 'Base' : `+$${size.priceModifier.toFixed(2)}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Item Info (Icons) */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-100 dark:border-gray-600">
              <Clock className="text-orange-500" size={20} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Prep Time</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.preparationTime} mins</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-100 dark:border-gray-600">
              <Flame className={item.spicyLevel > 0 ? "text-red-500" : "text-gray-300 dark:text-gray-500"} size={20} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Spiciness</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{['None', 'Mild', 'Medium', 'Hot'][item.spicyLevel]}</p>
              </div>
            </div>
          </div>

          {/* Order Summary (Visible if size changed) */}
          {sizeModifier > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-600">
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Your Selection</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Base ({SIZE_OPTIONS.find(s => s.id === selectedSize)?.label})</span>
                  <span>${(Number(item.price) + sizeModifier).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
                  <span>Unit Price</span>
                  <span>${unitPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quantity and Add to Order Button */}
          <div className="flex gap-2 sm:gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl px-3 sm:px-4 border border-gray-100 dark:border-gray-600">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white active:text-orange-500 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"><Minus size={20} /></button>
              <span className="font-bold text-lg w-6 text-center text-gray-900 dark:text-white">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white active:text-orange-500 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"><Plus size={20} /></button>
            </div>
            
            {/* Main Button with New Logic */}
            <button
              className="flex-1 bg-gray-900 dark:bg-orange-600 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-gray-800 dark:hover:bg-orange-500 transition-colors shadow-lg shadow-gray-900/20 dark:shadow-orange-600/30 active:scale-[0.98] transform duration-100 min-h-[52px]"
              onClick={handleAddToCart}
            >
              Add - ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;