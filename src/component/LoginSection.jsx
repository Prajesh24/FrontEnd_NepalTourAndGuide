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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username: formData.username, password: formData.password });
  
      if (response && response.data) {
          const { token, role, userId } = response.data.data || response.data;
  
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("role", role);
  
          if (!role) {
              setMessage("Error: Role is undefined.");
              return;
          }
  
          setMessage("Login successful!");
  
          setTimeout(() => {
              if (role === "admin") {
                  navigate("/admindashboard");
              } else if (role === "traveler") {
                  navigate("/dashboard");
              } else {
                  setMessage("Role not recognized.");
              }
          }, 1000);
      } else {
          setMessage("Invalid response from the server.");
      }
  } catch (error) {
      console.log("Login error:", error);
      setMessage(error.response?.data?.error || "Unexpected error");
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
