import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';

// ⚠️ වැදගත්: මෙතනට ඔයාගේ WhatsApp නම්බර් එක දාන්න (94 න් පටන් ගන්න)
const MY_PHONE_NUMBER = '94773257487'; 

const CartDrawer = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQty, 
    cartTotal 
  } = useCart();

  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Form එකේ අකුරු ටයිප් කරනකොට මේක වැඩ කරනවා
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // WhatsApp මැසේජ් එක හදන කොටස
  const handleWhatsAppOrder = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all details!");
      return;
    }

    // 1. Order එකේ මාතෘකාව
    let message = `*🛒 NEW ORDER!* \n\n`;
    message += `*👤 Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}\n\n`;

    // 2. ඇණවුම් කළ කෑම වර්ග ටික
    message += `*📦 Order Items:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.selectedSize}) x ${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
    });

    // 3. මුළු එකතුව
    message += `\n*💰 Total Amount: $${cartTotal.toFixed(2)}*`;

    // 4. WhatsApp Link එක හදනවා
    const url = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // 5. අලුත් Tab එකක WhatsApp Open කරනවා
    window.open(url, '_blank');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* 1. Header Area */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {isCheckout ? (
              <button onClick={() => setIsCheckout(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300"/>
              </button>
            ) : (
              <ShoppingBag className="text-orange-500" />
            )}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isCheckout ? 'Checkout' : 'Your Order'}
            </h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* 2. Body Area */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p>Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-orange-500 font-bold hover:underline"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <>
              {isCheckout ? (
                /* CHECKOUT FORM */
                <form onSubmit={handleWhatsAppOrder} className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl mb-6">
                    <p className="text-sm text-orange-800 dark:text-orange-200 font-medium text-center">
                      Fill in your details to place the order via WhatsApp.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="077 123 4567"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
                    <textarea 
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="No. 123, Main Street, Colombo"
                      rows="3"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white resize-none"
                    ></textarea>
                  </div>
                </form>
              ) : (
                /* CART ITEMS LIST */
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex gap-4 bg-white dark:bg-gray-800 p-2 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                            <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-500"><X size={16}/></button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{item.selectedSize} Size</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="font-bold text-orange-600">${(item.price * item.qty).toFixed(2)}</p>
                          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg px-2 py-1">
                            <button onClick={() => updateQty(item.cartId, item.qty - 1)} className="p-1 hover:text-orange-500"><Minus size={14}/></button>
                            <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.cartId, item.qty + 1)} className="p-1 hover:text-orange-500"><Plus size={14}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* 3. Footer Area */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 dark:text-gray-400">Total Amount</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
            </div>
            
            {isCheckout ? (
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Place Order on WhatsApp
              </button>
            ) : (
              <button 
                onClick={() => setIsCheckout(true)}
                className="w-full bg-gray-900 dark:bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-orange-500 active:scale-95 transition-all"
              >
                Checkout Now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;