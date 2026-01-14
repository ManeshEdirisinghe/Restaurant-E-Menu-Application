'use client';

interface HeroProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function Hero({ search, onSearch }: HeroProps) {
  return (
    <div className="relative w-full min-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')",
        }}
      />

      {/* Brand Red Overlay */}
      <div className="absolute inset-0 bg-brand-red/85" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
        {/* EST. 2024 with lines */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-16 h-px bg-brand-gold" />
          <span className="text-brand-gold text-sm tracking-widest uppercase font-sans">
            Est. 2024
          </span>
          <span className="w-16 h-px bg-brand-gold" />
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-4">
          Delicious Bites Restaurant
        </h1>

        {/* Subtitle */}
        <p className="text-white text-lg md:text-xl font-sans mb-10">
          Experience culinary excellence
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search our menu..."
            className="w-full px-6 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-gold shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
