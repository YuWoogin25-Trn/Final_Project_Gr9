import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import arrowIcon from '../assets/arrow_icon.png'; 

function HomePage() {
  const navigate = useNavigate();

  const goToFinder = () => {
    navigate('/recog');
  };

  return (
    <div className="homepage-content">
      <h1 className="welcome-title">Welcome to our flower shop!</h1>
      <p className="welcome-subtitle">Every flower has a name. Let us help you find it.</p>
      <button className="finder-arrow-btn" onClick={goToFinder}>
        <img src={arrowIcon} alt="Go to finder" />
      </button>
    </div>
  );
}

export default HomePage;