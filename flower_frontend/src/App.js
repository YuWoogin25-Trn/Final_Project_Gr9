import React, { useState, useEffect } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import bgImage from './assets/Background_03.png';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
      />
      
      <main className="main-content-wrapper">
        <ImageUploader />
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