'use client';

interface HeroProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function Hero({ search, onSearch }: HeroProps) {
  return (
    <div className="relative w-full min-h-[520px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')",
        }}
      />

      {/* Dark Burgundy Overlay */}
      <div className="absolute inset-0 bg-[#711224]/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
        {/* EST. 2024 with lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-12 h-[1px] bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm tracking-[0.25em] uppercase">
            EST. 2024
          </span>
          <span className="w-12 h-[1px] bg-[#D4AF37]" />
        </div>

        {/* Main Title */}
        <h1 className="font-serif italic text-5xl md:text-6xl lg:text-7xl text-white font-normal mb-4 leading-tight">
          Delicious Bites
          <br />
          Restaurant
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-lg md:text-xl italic mb-12">
          Experience culinary excellence
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search our menu..."
            className="w-full px-6 py-3.5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] shadow-lg text-center"
          />
        </div>
      </div>
    </div>
  );
}
