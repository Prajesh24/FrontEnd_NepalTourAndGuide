import React, { useState } from 'react';
import './../style/SignUpSection.css';
import { Link, useNavigate } from "react-router-dom";
import {register} from './../Api/api.js';

const SignUpSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await register({
        name: formData.name,
        username: formData.username,
        phone: formData.phone,
        role: formData.role,
        password: formData.password
      });

      alert(response.data.message); // Show success message
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="signup-container">
      <div className="image-section">
        <div className="overlay">
          <h1>Join Nepal Tour And Guide</h1>
          <p>Embark on Epic Adventures!</p>
        </div>
      </div>
      <div className="form-section-signup">
        <h2>Create Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your Username" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select id="role" required onChange={handleChange}>
              <option value="">Choose a role</option>
              <option value="admin">Admin</option>
              <option value="traveler">Traveler</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="Confirm your password" required onChange={handleChange} />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
          <p className="login-link">Already have an account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignUpSection;
