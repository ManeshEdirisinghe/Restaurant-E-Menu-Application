import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, X, Leaf, Wheat } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'popular', label: 'Most Popular' },
];

const DIETARY_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian', icon: Leaf, color: 'green' },
  { value: 'vegan', label: 'Vegan', icon: Leaf, color: 'emerald' },
  { value: 'gluten-free', label: 'Gluten-Free', icon: Wheat, color: 'amber' },
];

const PRICE_RANGES = [
  { value: 'all', label: 'All Prices', min: 0, max: Infinity },
  { value: 'budget', label: 'Under $10', min: 0, max: 10 },
  { value: 'mid', label: '$10 - $20', min: 10, max: 20 },
  { value: 'premium', label: '$20 - $30', min: 20, max: 30 },
  { value: 'luxury', label: 'Over $30', min: 30, max: Infinity },
];

const FilterBar = ({
  itemCount,
  totalCount,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  dietaryFilters,
  onDietaryChange,
  onClearFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = priceRange !== 'all' || dietaryFilters.length > 0;
  const activeFilterCount = (priceRange !== 'all' ? 1 : 0) + dietaryFilters.length;

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Top Row - Item Count & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Item Count */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{itemCount}</span>
            <span className="text-gray-500">
              {itemCount === 1 ? 'item' : 'items'} found
              {totalCount !== itemCount && (
                <span className="text-gray-400"> of {totalCount} total</span>
              )}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-orange-50 border-orange-200 text-orange-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <SlidersHorizontal size={18} />
              <span className="font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-gray-700 font-medium hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Range Filter */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => onPriceRangeChange(range.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        priceRange === range.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Preferences Filter */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Dietary Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((diet) => {
                    const isActive = dietaryFilters.includes(diet.value);
                    const IconComponent = diet.icon;
                    return (
                      <button
                        key={diet.value}
                        onClick={() => onDietaryChange(diet.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? `bg-${diet.color}-100 text-${diet.color}-700 border border-${diet.color}-300`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        style={
                          isActive
                            ? {
                                backgroundColor:
                                  diet.color === 'green'
                                    ? '#dcfce7'
                                    : diet.color === 'emerald'
                                    ? '#d1fae5'
                                    : '#fef3c7',
                                color:
                                  diet.color === 'green'
                                    ? '#15803d'
                                    : diet.color === 'emerald'
                                    ? '#047857'
                                    : '#b45309',
                              }
                            : {}
                        }
                      >
                        <IconComponent size={16} />
                        {diet.label}
                        {isActive && <X size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={onClearFilters}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <X size={16} />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Filter Tags (when collapsed) */}
        {!showFilters && hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {PRICE_RANGES.find((r) => r.value === priceRange)?.label}
                <button
                  onClick={() => onPriceRangeChange('all')}
                  className="hover:text-gray-900"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {dietaryFilters.map((diet) => {
              const config = DIETARY_OPTIONS.find((d) => d.value === diet);
              return (
                <span
                  key={diet}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {config?.label}
                  <button
                    onClick={() => onDietaryChange(diet)}
                    className="hover:text-gray-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { FilterBar, PRICE_RANGES, SORT_OPTIONS, DIETARY_OPTIONS };
export default FilterBar;
