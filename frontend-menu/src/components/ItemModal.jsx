import React, { useState, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';

const SIZE_OPTIONS = [
  { id: 'small', label: 'Small', priceModifier: 0 },
  { id: 'medium', label: 'Medium', priceModifier: 2 },
  { id: 'large', label: 'Large', priceModifier: 4 },
];

const ItemModal = ({ item, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !item) return null;
  
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');

  useEffect(() => {
    if (isOpen) {
      setQty(1);
      setSelectedSize('medium');
    }
  }, [isOpen, item]);

  // මිල ගණනය
  const sizeModifier = SIZE_OPTIONS.find(s => s.id === selectedSize)?.priceModifier || 0;
  const unitPrice = Number(item.price) + sizeModifier;
  const totalPrice = unitPrice * qty;

  const handleButtonClick = () => {
    console.log("1. Button Clicked!"); // බොත්තම ඔබපු බව තහවුරු කරගන්න

    // onAddToCart function එක ලැබිලා තියෙනවද බලනවා
    if (typeof onAddToCart === 'function') {
      console.log("2. Sending data to App.jsx...");
      
      const itemToAdd = {
        ...item,
        selectedSize,
        price: unitPrice,
        basePrice: item.price
      };
      
      onAddToCart(itemToAdd, qty);
    } else {
      console.error("ERROR: onAddToCart function එක ItemModal එකට ලැබී නැත!");
      alert("Error: Connection to Cart is broken.");
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-200 text-black transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-48 md:h-auto bg-gray-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* Details Side */}
        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h2>
          <p className="text-orange-600 font-bold text-xl my-2">${unitPrice.toFixed(2)}</p>

          {/* Size Selector */}
          <div className="my-4">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Size:</p>
            <div className="flex gap-2">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`flex-1 py-2 text-xs rounded border ${selectedSize === size.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Qty & Add Button */}
          <div className="mt-auto pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
               <button onClick={() => setQty(Math.max(1, qty-1))} className="p-2"><Minus size={16}/></button>
               <span className="font-bold">{qty}</span>
               <button onClick={() => setQty(qty+1)} className="p-2"><Plus size={16}/></button>
            </div>
            
            <button 
              onClick={handleButtonClick}
              className="w-full bg-gray-900 dark:bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-gray-800 active:scale-95 transition-all"
            >
              Add to Order - ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;