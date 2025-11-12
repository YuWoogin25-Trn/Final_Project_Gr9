import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';
import logo from '../assets/Logo_01.png';
import cartIcon from '../assets/cart_icon.png';
import accountIcon from '../assets/account_icon.png';
import arrowIcon from '../assets/arrow_icon.png';

function Navbar({ user, onLoginClick, onLogout, isHomePage }) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignupClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-left">        
        <Link to="/">
          <img src={logo} alt="Logo" className="nav-logo" />
        </Link>
      </div>

      <nav className="nav-center">        
        <span className="nav-link">Home</span>
        <span className="nav-link">Shop</span>
        <span className="nav-link">Blog</span>
        <span className="nav-link">About</span>
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
                  <div className="dropdown-item" onClick={onLoginClick}>
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
        
        {!isHomePage && (
          <Link to="/" className="nav-button">
            Back to welcome page
            <img src={arrowIcon} alt="Arrow" className="nav-arrow" />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;

