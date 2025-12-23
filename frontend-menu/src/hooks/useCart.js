import { useState, useEffect } from 'react';

export function useCart() {
  // 1. LocalStorage එකෙන් Data ගන්නවා
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. Cart එක වෙනස් වෙන හැම වෙලේම LocalStorage Save කරනවා
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. Add to Cart Function එක (මෙතන තමයි වෙනස කළේ)
  const addToCart = (product, qty = 1) => {
    console.log("Adding to cart:", product); // Testing සඳහා Log එකක්

    setCartItems((prev) => {
      // කලින් මේ Item එකම (එම Size එකෙන්ම) තියෙනවාද බලනවා
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItemIndex > -1) {
        // තියෙනවා නම් Qty එක විතරක් වැඩි කරනවා
        const newCart = [...prev];
        newCart[existingItemIndex].qty += qty;
        return newCart;
      } else {
        // අලුත් Item එකක් නම් අලුතින්ම එකතු කරනවා
        // Unique ID එකක් හදනවා (ID + Size) නැත්නම් key error එන්න පුළුවන්
        const newItem = {
          ...product,
          cartId: `${product.id}-${product.selectedSize}`, // React key එක සඳහා
          qty: qty
        };
        return [...prev, newItem];
      }
    });
    
  };

  // 4. Remove Item
  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // 5. Update Quantity
  const updateQty = (cartId, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, qty: newQty } : item))
    );
  };

  // Totals ගණනය කිරීම
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
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