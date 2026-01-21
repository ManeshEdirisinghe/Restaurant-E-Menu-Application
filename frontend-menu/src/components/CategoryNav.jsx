import React from 'react';
import { 
  UtensilsCrossed, 
  Salad, 
  Utensils, 
  Cake, 
  CupSoda, 
  Pizza, 
  Soup,
  Coffee
} from 'lucide-react';

const CategoryNav = ({ categories, activeCategory, onCategoryChange, isLoading }) => {
  
  const getCategoryIcon = (categoryName) => {
    const name = (categoryName || '').toLowerCase();

    if (name.includes('view all') || name.includes('all')) return <UtensilsCrossed size={20} />;
    if (name.includes('appetizer')) return <Salad size={20} />;
    if (name.includes('main')) return <Utensils size={20} />;
    if (name.includes('dessert') || name.includes('cake')) return <Cake size={20} />;
    if (name.includes('beverage') || name.includes('drink')) return <CupSoda size={20} />;
    if (name.includes('pizza')) return <Pizza size={20} />;
    if (name.includes('soup')) return <Soup size={20} />;
    if (name.includes('coffee') || name.includes('tea')) return <Coffee size={20} />;
    
    return <UtensilsCrossed size={20} />;
  };

  return (
    <div className="sticky top-0 z-40 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50 py-3 sm:py-4 transition-all">
      <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar px-3 sm:px-6 -mx-1">
        {isLoading ? (
          <div className="flex gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 sm:h-12 w-24 sm:w-28 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />)}
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-3 min-w-max px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`
                  group flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border flex-shrink-0 active:scale-95
                  ${activeCategory === cat.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}
                `}
              >
                {/* වැදගත්ම තැන: මෙතන cat.icon වෙනුවට function එක call කර ඇත */}
                <span className={`transition-transform duration-300 ${activeCategory === cat.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {getCategoryIcon(cat.name)} 
                </span>
                
                <span className="whitespace-nowrap">{cat.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryNav;