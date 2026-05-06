import React, { useState } from 'react';
import { signIn } from '../api';
import AuthLayout from '../pages/AuthLayout';

const Login = ({ setView, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signIn(formData);
      onLoginSuccess(data);
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      alert(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <AuthLayout isLogin={true}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            required 
            placeholder="admin@task.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            required 
            placeholder="••••••••"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <button type="submit" className="btn-primary">
          Sign In
        </button>
      </form>
      
      <p className="switch-text">
        New here? 
        <button onClick={() => setView('signup')} className="link-btn">Create Account</button>
      </p>
    </AuthLayout>
  );
};

export default Login;