import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/Logo_01.png';
import cartIcon from '../assets/cart_icon.png';
import accountIcon from '../assets/account_icon.png';
import arrowIcon from '../assets/arrow_icon.png';

function Navbar({ user, onLoginClick, onLogout }) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    onLoginClick();
    setIsMenuOpen(false);
  };
  const handleSignupClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
      </div>

      <nav className="nav-center">
        <a href="#home" className="nav-link">Home</a>
        <a href="#shop" className="nav-link">Shop</a>
        <a href="#blog" className="nav-link">Blog</a>
        <a href="#about" className="nav-link">About</a>
      </nav>

      <div className="nav-right">
        <img src={cartIcon} alt="Cart" className="nav-icon" />
        
        <div className="account-menu">
          <img 
            src={accountIcon} 
            alt="Account" 
            className="nav-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          />
          
          {isMenuOpen && (
            <div className="account-dropdown">
              {user ? (                
                <>
                  <div className="dropdown-item user-info">
                    {user.displayname}
                  </div>
                  <div className="dropdown-item" onClick={onLogout}>
                    Đăng xuất
                  </div>
                </>
              ) : (
                <>
              <div className="dropdown-item" onClick={handleLoginClick}>
                Login
              </div>
              <div className="dropdown-item" onClick={handleSignupClick}>
                Sign Up
              </div>
              </>
              )}
            </div>
          )}
        </div>

        <button className="nav-button">
          Back to home page
          <img src={arrowIcon} alt="Arrow" className="nav-arrow" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;