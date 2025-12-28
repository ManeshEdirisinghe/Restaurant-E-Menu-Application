import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // තත්පර 3කින් මැකෙනවා
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[100] animate-bounce-in">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-[300px] justify-between border border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 rounded-full p-1">
            <CheckCircle size={16} className="text-white" />
          </div>
          <span className="font-medium text-sm">{message}</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;