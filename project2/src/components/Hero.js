import React from 'react';

const Hero = ({ search, onSearchChange }) => {
  return (
    <div className="hero">
      <img src="https://cdn.pixabay.com/photo/2019/07/15/08/32/australia-4338882_1280.jpg" alt="Sydney Opera House" />
      <div className="overlay">
        <div className="hero-content">
          <h2>Book unique places to stay and things to do.</h2>
          <p>Unforgettable trips start with Airbnb.</p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for places"
              value={search}
              onChange={onSearchChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 