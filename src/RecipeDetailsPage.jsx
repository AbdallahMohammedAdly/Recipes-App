// src/pages/RecipeDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetailsPage() {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const result = await response.json();
        setRecipe(result.meals[0]);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [idMeal]);

  if (loading) {
    return <p className="loading-message">Loading recipe details...</p>;
  }

  if (!recipe) {
    return <p className="no-results-message">Recipe not found.</p>;
  }

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push({
          ingredient: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }
    return ingredients;
  };

  return (
    <div className="recipe-details-page">
      <div className="recipe-header tw:flex tw:justify-center tw:items-center tw:flex-col">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-details-image" />
        <h1>{recipe.strMeal}</h1>
      </div>
      <div className="recipe-info">
        <p><strong>Category:</strong> {recipe.strCategory}</p>
        <p><strong>Area:</strong> {recipe.strArea}</p>
      </div>

      <div className="recipe-instructions">
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
      </div>

      <div className="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul>
          {getIngredients().map((item, index) => (
            <li key={index}>
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      </div>

      {recipe.strYoutube && (
        <div className="recipe-video">
          <h3>Watch Video</h3>
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </div>
      )}
    </div>
  );
}

export default RecipeDetailsPage;