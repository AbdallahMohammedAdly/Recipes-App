// src/CategoryList.js

import React from 'react';

function CategoryList({ categories }) {
  if (!categories || categories.length === 0) {
    return <p className="no-results-message">No categories found.</p>;
  }

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div key={category.idCategory} className="category-card">
          <img src={category.strCategoryThumb} alt={category.strCategory} className="category-image" />
          <div className="card-content">
            <h3 className="category-title">{category.strCategory}</h3>
            <p className="category-description">
              {category.strCategoryDescription.slice(0, 100)}...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;