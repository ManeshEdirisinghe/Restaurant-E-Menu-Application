'use client';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'appetizers', label: 'Appetizers' },
  { id: 'mains', label: 'Main Course' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'beverages', label: 'Beverages' },
];

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="bg-[#711224] overflow-x-auto">
      <div className="flex justify-center gap-3 py-6 px-4">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-6 py-2.5 rounded-full transition-colors font-medium text-sm ${
                isActive
                  ? 'bg-[#8B1E3F] text-white'
                  : 'bg-[#F6F2E9] text-gray-800 hover:bg-white'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
