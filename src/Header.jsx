// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const result = await response.json();
        setCategories(result.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategoriesMenu = () => {
    setShowCategories(!showCategories);
  };

  return (
    <header className="app-header">
      <div className="header-top">
        <Link to="/" className="app-title-link">
          <h1 className="app-title">Food App</h1>
        </Link>
        
     <div className="">
         <button className="menu-button" onClick={toggleCategoriesMenu}>
          {showCategories ? 'Hide Categories' : 'Browse Categories'}
        </button>
          <Link to="/" className="footer-home-link tw:mx-3">
                Back to Home
              </Link>
     </div>
        
      
      </div>

      {showCategories && (
        <nav className="categories-nav">
          <ul className="categories-list">
            {categories.map((category) => (
              <li key={category.idCategory} className="category-item">
                <Link
                  to={`/category/${category.strCategory}`}
                  className="category-link"
                  onClick={() => setShowCategories(false)} // Hide menu on click
                >
                  {category.strCategory}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;