import React, { useState } from 'react';
import { signUp } from '../api'; 
import AuthLayout from '../pages/AuthLayout';

const Signup = ({ setView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Member' // Default role as per your requirement
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting Signup with:", formData);

    try {
      const response = await signUp(formData);
      console.log("Signup Success:", response.data);
      alert("Registration Successful! Please login.");
      setView('login');
    } catch (err) {
      // This will capture why the server is giving a 500 error
      const errorMsg = err.response?.data?.message || "Internal Server Error. Check Backend Console.";
      console.error("Signup Error Details:", err.response?.data);
      alert(errorMsg);
    }
  };

  return (
    <AuthLayout isLogin={false}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            required 
            placeholder="Enter your name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            required 
            placeholder="email@example.com"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            required 
            placeholder="••••••••"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select 
            className="dash-input"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="Member">Member (Employee)</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Get Started
        </button>
      </form>
      <p className="switch-text">
        Already have an account? 
        <button onClick={() => setView('login')} className="link-btn">Log In</button>
      </p>
    </AuthLayout>
  );
};

export default Signup;