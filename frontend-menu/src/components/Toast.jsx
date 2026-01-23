import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, isVisible, onClose }) => {
  // Animation එක ස්මූත් කරන්න පොඩි state එකක්
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      // තත්පර 3කින් මැකෙනවා
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Animation එක ඉවර වෙනකම් ඉඳලා onClose කරන්න
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !show) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-start justify-center pt-24 transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      {/* 1. Blur Backdrop Layer (මේක තමයි අලුත් කොටස) */}
      {/* bg-black/10 = පොඩි කළු පාට ටින්ට් එකක් */}
      {/* backdrop-blur-sm = වටේ බොඳ කරනවා */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => { setShow(false); setTimeout(onClose, 300); }} // පසුබිම Click කළාමත් මැකෙනවා
      ></div>

      {/* 2. Toast Content Box */}
      {/* transform transition-all = ලස්සනට උඩ ඉඳන් පහළට එන්න */}
      <div className={`relative bg-orange-600 text-white px-6 py-4 rounded-2xl shadow-[0_20px_60px_-15px_rgba(249,115,22,0.5)] flex items-center justify-between gap-4 border-2 border-white/20 w-[90%] sm:w-auto max-w-md transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${show ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'}`}>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-full p-2 shadow-inner">
            <CheckCircle size={28} className="text-white" />
          </div>
          
          <div>
            <h4 className="font-bold text-lg leading-none mb-1 drop-shadow-sm">Success!</h4>
            <p className="text-sm text-orange-50 font-medium leading-tight">{message}</p>
          </div>
        </div>

        <button 
          onClick={() => { setShow(false); setTimeout(onClose, 300); }}
          className="p-2 hover:bg-white/20 rounded-full transition-colors -mr-2"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toast;