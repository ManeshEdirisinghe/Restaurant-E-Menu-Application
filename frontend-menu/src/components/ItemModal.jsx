import React, { useState } from 'react';
import { X, Clock, Flame, Minus, Plus } from 'lucide-react';

const ItemModal = ({ item, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !item) return null;
  
  const [qty, setQty] = useState(1);

  // Reset qty when modal opens
  useEffect(() => {
    if (isOpen) setQty(1);
  }, [isOpen, item]);

  // Handle Add to Order click
  const handleAddToCart = () => {
    onAddToCart(item, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-zoom-in">
        
        {/* ... (Close button and Image section remain same) ... */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white text-gray-800 transition-colors"><X size={20} /></button>
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' }} />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          {/* ... (Item details like Name, Desc, Price remain same) ... */}
          
          <div className="flex gap-4 mt-auto">
             <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 border border-gray-100">
               <button onClick={() => setQty(Math.max(1, qty-1))} className="text-gray-400 hover:text-black transition-colors"><Minus size={18}/></button>
               <span className="font-bold text-lg w-4 text-center">{qty}</span>
               <button onClick={() => setQty(qty+1)} className="text-gray-400 hover:text-black transition-colors"><Plus size={18}/></button>
            </div>
            
            {/* Update the main button */}
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors"
            >
              Add to Order - ${(item.price * qty).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;