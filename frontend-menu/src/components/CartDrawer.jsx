import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, items, onRemove, onUpdateQty, total }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="text-orange-500" />
              Your Order
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p>Your cart is empty</p>
                <button onClick={onClose} className="text-orange-500 font-medium hover:underline">
                  Browse Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                  // මෙතන key එකට සහ remove/update වලට item.cartId පාවිච්චි කරන්න ඕන
                  <div key={item.cartId} className="flex gap-4 animate-fade-in mb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                        {/* Size එක පෙන්නමු */}
                        <p className="text-xs text-gray-500 capitalize">Size: {item.selectedSize}</p>
                        <p className="text-orange-500 font-bold">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                          {/* මෙතන item.cartId භාවිතා කරන්න */}
                          <button onClick={() => onUpdateQty(item.cartId, item.qty - 1)} className="p-1 hover:text-orange-600 disabled:opacity-50" disabled={item.qty <= 1}>
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => onUpdateQty(item.cartId, item.qty + 1)} className="p-1 hover:text-orange-600">
                            <Plus size={14} />
                          </button>
                        </div>
                        {/* මෙතනත් item.cartId භාවිතා කරන්න */}
                        <button onClick={() => onRemove(item.cartId)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Footer (Total & Checkout) */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-gray-900/10">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;