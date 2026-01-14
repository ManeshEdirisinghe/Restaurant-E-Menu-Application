'use client';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = ['all', 'appetizers', 'mains', 'desserts', 'beverages'];

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 justify-start md:justify-center px-4 py-4 min-w-max md:min-w-0">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-6 py-2 rounded-full capitalize font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-brand-red text-white'
                  : 'bg-brand-beige text-gray-800 hover:bg-brand-red/10'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
