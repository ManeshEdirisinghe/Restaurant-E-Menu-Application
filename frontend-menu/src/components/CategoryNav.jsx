import React from 'react';

const CategoryNav = ({ categories, activeCategory, onCategoryChange, isLoading }) => {
  return (
    <div className="sticky top-0 z-40 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50 py-4 transition-all">
      <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar px-4 sm:px-6">
        {isLoading ? (
          <div className="flex gap-4">{[1,2,3,4,5].map(i => <div key={i} className="h-12 w-28 bg-gray-200 rounded-full animate-pulse" />)}</div>
        ) : (
          <div className="flex gap-3 min-w-max mx-auto">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => onCategoryChange(cat.id)} className={`group flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat.id ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20 scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'}`}>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default CategoryNav;