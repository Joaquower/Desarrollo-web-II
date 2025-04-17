import React, { useEffect, useState } from 'react';
import './App.css';
import { FaBed, FaUserFriends } from 'react-icons/fa';

function App() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json")
      .then(res => res.json())
      .then(data => setProperties(data));
  }, []);

  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <div className="hero">
        <img src="https://cdn.pixabay.com/photo/2019/07/15/08/32/australia-4338882_1280.jpg" alt="Hero" />
        <div className="overlay">
          <h2>Book unique places to stay and things to do.</h2>
          <p>Unforgettable trips start with Airbnb.</p>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card-container">
        {filtered.map((p, i) => (
          <div className="card" key={i}>
            <img src={p.image} alt={p.title} />
            {p.superHost && <span className="badge">Superhost</span>}
            <div className="card-content">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <div className="info">
                <span><FaBed /> {p.beds} Bedroom</span>
                <span><FaUserFriends /> {p.guests} Guest</span>
                <span>⭐ {p.rating}</span>
              </div>
              <strong>${p.price}/night</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
