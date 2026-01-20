import { useState } from 'react';

// Custom hook for managing cart state
export default function useCart(initialCart = []) {
  const [cart, setCart] = useState(initialCart);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    );
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
