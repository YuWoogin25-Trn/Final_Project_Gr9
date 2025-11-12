import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import ImageUploader from './components/ImageUploader';

import HomePage from './pages/Homepage';

import bgImage from './assets/Background_03.png';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
    
  const location = useLocation();  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []); 

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bgImage})` }}>
            
      <Navbar 
        user={currentUser} 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        isHomePage={isHomePage} 
      />
      
      <main className="main-content-wrapper">        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recog" element={<ImageUploader />} />          
        </Routes>
      </main>
      
      {isLoginModalOpen && !currentUser && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;