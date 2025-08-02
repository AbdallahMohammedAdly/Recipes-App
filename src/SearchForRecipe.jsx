// src/components/SearchForRecipe.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function SearchForRecipe() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isInitialMount = useRef(true); 
  const debounceTimeout = useRef(null);

  const fetchData = async (query) => {
    if (!query) {
      setData(null);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchData(search);
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-recipe-container">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      {loading && <p className="loading-message">Searching...</p>}
      {data && data.meals && (
        <ul className="recipe-list">
          {data.meals.map((meal) => (
            <li key={meal.idMeal} className="recipe-item">
              <Link to={`/recipe/${meal.idMeal}`} className="recipe-link">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-thumbnail" />
                <span className="recipe-name">{meal.strMeal}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {data && !data.meals && !loading && search && (
        <p className="no-results-message">No recipes found. Try another search.</p>
      )}
      {!data && !loading && !search && (
          <p className="initial-message">Start typing to find a recipe!</p>
      )}
    </div>
  );
}

export default SearchForRecipe;