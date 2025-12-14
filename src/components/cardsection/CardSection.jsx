import React from 'react';
import './Cardsection.css'; // Import the CSS file

const CardSection = () => {
  return (
    <div className="card-section">
      <h2>Browse The Range</h2>
      <p>Loreum ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="card-container">
        <div className="card">
          <img src="/card1.png" alt="Dining" />
          <h3>Dining</h3>
        </div>
        <div className="card">
          <img src="/card2.png" alt="Living" />
          <h3>Living</h3>
        </div>
        <div className="card">
          <img src="/card1.png" alt="Bedroom" />
          <h3>Bedroom</h3>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
