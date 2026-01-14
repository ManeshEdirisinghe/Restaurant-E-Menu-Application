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
    <div className="overflow-x-auto">
      <div className="flex justify-center gap-4 py-8">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-6 py-2 rounded-full capitalize transition-colors font-medium ${
                isActive
                  ? 'bg-[#711224] text-white'
                  : 'bg-[#F6F2E9] text-gray-800 hover:bg-gray-200'
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
