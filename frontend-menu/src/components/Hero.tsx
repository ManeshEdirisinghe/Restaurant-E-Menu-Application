'use client';

interface HeroProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function Hero({ search, onSearch }: HeroProps) {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <img
        src="/HeroBG.jpg"
        alt="Restaurant background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Burgundy Overlay */}
      <div className="absolute inset-0 bg-[#4A0E16] opacity-90" />

      {/* Content Layer */}
      <div className="relative z-10 text-center">
        {/* EST. 2024 Badge with lines */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-[1px] w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">
            EST. 2024
          </span>
          <span className="h-[1px] w-12 bg-[#D4AF37]" />
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-6xl text-white mb-4">
          Delicious Bites Restaurant
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-lg text-gray-200 mb-12">
          Experience culinary excellence
        </p>

        {/* Search Input */}
        <div className="flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search our menu..."
            className="w-[480px] py-4 px-8 rounded-full bg-white text-gray-700 placeholder-gray-400 shadow-lg focus:outline-none text-center"
          />
        </div>
      </div>
    </div>
  );
}
