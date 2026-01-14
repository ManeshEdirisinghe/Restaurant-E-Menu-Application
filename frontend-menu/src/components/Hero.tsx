'use client';

import Image from 'next/image';

interface HeroProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function Hero({ search, onSearch }: HeroProps) {
  return (
    <div className="relative w-full min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/HeroBG.jpg"
        alt="Restaurant background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark Burgundy Overlay */}
      <div className="absolute inset-0 bg-[#351516]/85" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20 max-w-5xl mx-auto">
        {/* EST. 2024 with lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-20 h-[1px] bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-base tracking-[0.4em] uppercase font-normal">
            EST. 2024
          </span>
          <span className="w-20 h-[1px] bg-[#D4AF37]" />
        </div>

        {/* Main Title - Larger font */}
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white font-normal mb-8 leading-[1.1]">
          Delicious Bites
          <br />
          Restaurant
        </h1>

        {/* Subtitle - Italic */}
        <p className="text-white text-xl md:text-2xl italic mb-3">
          Experience culinary excellence
        </p>

        {/* Explore Menu text with line */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-[#D4AF37] text-sm tracking-[0.25em] uppercase mb-3">
            EXPLORE MENU
          </span>
          <span className="w-[1px] h-8 bg-[#D4AF37]" />
        </div>

        {/* Search Input - Matching design */}
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search our menu..."
            className="w-full px-10 py-5 rounded-full bg-white text-gray-600 placeholder-gray-400 focus:outline-none shadow-xl text-center text-lg font-light"
          />
        </div>
      </div>
    </div>
  );
}
