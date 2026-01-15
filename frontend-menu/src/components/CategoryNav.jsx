import React from 'react';

export function CategoryNav({ categories, activeCategory, onCategoryChange }) {
  return (
    <nav className="category-nav">
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
