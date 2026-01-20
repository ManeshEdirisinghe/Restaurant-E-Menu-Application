import React from 'react';

export default function CartDrawer({ isOpen, cart, onClose, onRemove, onUpdateQuantity, onClear, onCheckout }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-40">
      <div className="w-full max-w-md h-full bg-white shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-2 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t flex flex-col gap-2">
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>
              ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={onClear}
              className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              disabled={cart.length === 0}
            >
              Clear Cart
            </button>
            <button
              onClick={onCheckout}
              className="flex-1 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
