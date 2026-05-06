import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import './styles/global.css';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const profile = localStorage.getItem('profile');
      if (profile && profile !== "undefined" && profile !== "null") {
        return JSON.parse(profile);
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  const [view, setView] = useState(user ? 'dashboard' : 'login');

  useEffect(() => {
    if (user) setView('dashboard');
    else if (view === 'dashboard') setView('login');
  }, [user]);

  const handleAuthSuccess = (userData) => {
    const userToSave = userData.result || userData.user || userData;
    localStorage.setItem('token', userData.token);
    localStorage.setItem('profile', JSON.stringify(userToSave));
    setUser(userToSave);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setView('login');
  };

  return (
    <div className="app-container">
      {view === 'login' && <Login setView={setView} onLoginSuccess={handleAuthSuccess} />}
      {view === 'signup' && <Signup setView={setView} onSignupSuccess={handleAuthSuccess} />}
      {view === 'dashboard' && user && (
        user.role?.toLowerCase() === 'admin' 
          ? <AdminDashboard user={user} onLogout={handleLogout} /> 
          : <EmployeeDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;