import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      // තත්පර 3කින් මැකෙනවා
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    // වෙනස්කම්: 
    // 1. top-24 දැම්මා (උඩින් පෙන්නන්න)
    // 2. animate-bounce (පොඩි ගැස්සීමක් එක්ක එන්න)
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] w-[90%] sm:w-auto animate-fade-in-down">
      
      <div className="bg-orange-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border-2 border-white/20 backdrop-blur-md">
        
        <div className="flex items-center gap-4">
          {/* Icon එක ලොකු කළා */}
          <div className="bg-white/20 rounded-full p-2">
            <CheckCircle size={28} className="text-white" />
          </div>
          
          <div>
            {/* මාතෘකාවක් එකතු කළා */}
            <h4 className="font-bold text-lg leading-none mb-1">Success!</h4>
            <p className="text-sm text-orange-50 font-medium">{message}</p>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toast;