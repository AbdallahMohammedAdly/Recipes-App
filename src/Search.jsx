// src/Search.js

import React, { useState } from 'react';

function Search({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value); // Pass the search term up to the parent component
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a category..."
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
}

export default Search;