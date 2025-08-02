// src/pages/CategoryMealsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CategoryMealsPage() {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meals for this category');
        }
        const result = await response.json();
        if (result.meals && Array.isArray(result.meals)) {
          setMeals(result.meals);
        } else {
          setMeals([]);
        }
      } catch (err) {
        console.error('Error fetching category meals:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryMeals();
  }, [categoryName]); // Re-fetch data whenever the categoryName changes

  return (
    <div className="category-meals-page">
      <h2 style={{ textAlign: "center", color: "#ff7043", textTransform: 'capitalize' }}>
        {categoryName} Recipes
      </h2>

      {loading ? (
        <p className="loading-message">Loading meals...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : meals.length > 0 ? (
        <div className="recipe-grid">
          {meals.map((meal) => (
            <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="recipe-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
              <h3 className="recipe-title">{meal.strMeal}</h3>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-results-message">No meals found for this category.</p>
      )}
    </div>
  );
}

export default CategoryMealsPage;