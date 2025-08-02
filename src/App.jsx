// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDetailsPage from './RecipeDetailsPage';
import CategoryMealsPage from './CategoryMealsPage'; // Import the new page
import Header from './Header';
import Footer from './Footer';
import './App.css';
import HomePage from './Homepage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:idMeal" element={<RecipeDetailsPage />} />
            {/* New route for category meals */}
            <Route path="/category/:categoryName" element={<CategoryMealsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;