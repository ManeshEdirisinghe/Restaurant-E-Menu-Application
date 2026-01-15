import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = ({ restaurant }) => (
  <footer className="bg-gray-900 text-white py-16 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">{restaurant?.name || "Restaurant"}</h3>
        <p className="text-gray-400 leading-relaxed max-w-xs">{restaurant?.description}</p>
        <div className="flex gap-4 pt-4">
           {[Instagram, Facebook, Twitter].map((Icon, i) => <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors"><Icon size={18} /></a>)}
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6 text-gray-200">Contact</h4>
        <div className="space-y-4 text-gray-400">
          <div className="flex items-start gap-3"><MapPin className="mt-1 shrink-0 text-orange-500" size={18} /><span>{restaurant?.address || "123 Flavor Street"}</span></div>
          <div className="flex items-center gap-3"><Phone className="shrink-0 text-orange-500" size={18} /><span>{restaurant?.phone}</span></div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">© 2024 {restaurant?.name}. All rights reserved.</div>
  </footer>
);
export default Footer;