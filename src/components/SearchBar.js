import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (city) {
      onSearch(city);
      setError(""); // Clear error if input is valid
    } else {
      setError("Please enter a city name.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter a City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SearchBar;
