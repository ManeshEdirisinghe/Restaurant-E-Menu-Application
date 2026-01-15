import React from 'react';

export function MenuGrid({ items, onItemClick }) {
  return (
    <div className="menu-grid">
      {items.map((item) => (
        <div
          key={item.id}
          className="menu-item"
          onClick={() => onItemClick(item)}
        >
          <img src={item.image} alt={item.name} className="menu-item-image" />
          <div className="menu-item-info">
            <h3 className="menu-item-name">{item.name}</h3>
            <p className="menu-item-description">{item.description}</p>
            <span className="menu-item-price">${item.price.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
