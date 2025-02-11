import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './../style/LoginSection.css';
import {login} from './../Api/api.js';

const Login = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State for error messages
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await login({ username: formData.username, password: formData.password });

        if (response.status === 200) {
            const { token, role } = response.data; // Extract token and role
            localStorage.setItem("token", token); // Store token for authentication

            setMessage("Login successful! Redirecting...");

            // Redirect based on role
            setTimeout(() => {
                if (role === "admin") {
                    navigate("/admindash");
                } else {
                    navigate("/dashboard");
                }
            }, 2000);
        }
    } catch (error) {
        setMessage(error.response?.data?.error);
    }
};


  return (
    <div className="login-container">
      <div className="login-image-section">
        <div className="overlay">
          <h1>
            Welcome to <br />
            Nepal Tour and Guide
          </h1>
          <p>Explore Nepal like never before.</p>
        </div>
      </div>
      <div className="form-section">
        <h2>Login to Your Account</h2>
        {message && <p className="message">{message}</p>}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Link to='/forgot' className="forgot-link">Forgot Password?</Link>
          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
