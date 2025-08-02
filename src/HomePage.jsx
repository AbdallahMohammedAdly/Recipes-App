// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchForRecipe from './SearchForRecipe';

function HomePage() {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [categories, setCategories] = useState([]); // New state for categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // First, try to fetch latest recipes
        const latestResponse = await fetch('https://www.themealdb.com/api/json/v1/1/latest.php');
        if (!latestResponse.ok) {
          throw new Error('Failed to fetch latest recipes');
        }
        const latestResult = await latestResponse.json();
        
        if (latestResult && latestResult.meals && latestResult.meals.length > 0) {
          setLatestRecipes(latestResult.meals);
        } else {
          // If no latest recipes, fetch categories instead
          const categoriesResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
          if (!categoriesResponse.ok) {
            throw new Error('Failed to fetch categories');
          }
          const categoriesResult = await categoriesResponse.json();
          if (categoriesResult && categoriesResult.categories) {
            setCategories(categoriesResult.categories);
          } else {
            setCategories([]);
          }
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError("Could not load data. Please try again later.");
        setLatestRecipes([]); 
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <section className="search-section">
        <h2>Find a Recipe by Name</h2>
        <SearchForRecipe />
      </section>

      <section className="latest-recipes-section">
        {loading ? (
          <p className="loading-message">Loading latest recipes...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div>
            {latestRecipes.length > 0 ? (
              <>
                <h2 style={{ textAlign: "center", color: "#ff7043", marginBottom: "20px" }}>Latest Recipes</h2>
                <div className="recipe-grid">
                  {latestRecipes.map((meal) => (
                    <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="recipe-card">
                      <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
                      <h3 className="recipe-title">{meal.strMeal}</h3>
                    </Link>
                  ))}
                </div>
              </>
            ) : categories.length > 0 ? (
              <>
                <h2 style={{ textAlign: "center", color: "#ff7043", marginBottom: "20px" }}>Explore Categories</h2>
                <div className="category-grid">
                  {categories.map((category) => (
                    <Link to={`/category/${category.strCategory}`} key={category.idCategory} className="category-card">
                      <img src={category.strCategoryThumb} alt={category.strCategory} className="category-image" />
                      <h3 className="category-title">{category.strCategory}</h3>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p className="no-results-message">No data found. Please check your internet connection.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;