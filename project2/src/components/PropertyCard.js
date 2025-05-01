import React from 'react';
import { FaBed, FaUserFriends } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const { title, description, image, superHost, beds, guests, rating, price } = property;

  return (
    <div className="card">
      {superHost && <span className="superhost-badge">Superhost</span>}
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3>{title}</h3>
        </div>
        <p className="description">{description}</p>
        <div className="amenities">
          <span className="beds"><FaBed /> {beds} {beds === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          <span className="guests"><FaUserFriends /> {guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
        </div>
        <div className="price-rating">
          <div className="price">
            <span>${price}</span>
            <span className="per-night">/night</span>
          </div>
          <div className="rating">
            <span>★ {rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 