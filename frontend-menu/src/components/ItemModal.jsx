import React from 'react';

export function ItemModal({ item, isOpen, onClose }) {
  if (!isOpen || !item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <img src={item.image} alt={item.name} className="modal-image" />
        <div className="modal-info">
          <h2 className="modal-title">{item.name}</h2>
          <p className="modal-description">{item.description}</p>
          <span className="modal-price">${item.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
