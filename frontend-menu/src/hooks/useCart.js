import { useState, useEffect } from 'react';

export function useCart() {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  // useCart.js ඇතුලේ
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      // ID එක සහ Size එක දෙකම සමාන නම් පමණක් Quantity එක වැඩි කරන්න
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === product.selectedSize);

      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.selectedSize === product.selectedSize)
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      // නැත්නම් අලුත් එකක් විදියට එකතු කරන්න
      return [...prev, { ...product, qty }];
    });
    setIsCartOpen(true); // Item එක දැම්ම ගමන් Cart එක Open වෙනවා
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  // Calculate total price
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  // Calculate total item count
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQty,
    cartTotal,
    cartCount
  };
}