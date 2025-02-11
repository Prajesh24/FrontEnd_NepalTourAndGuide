import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './../style/NavBar.css';
import logo from './../assets/logo.png';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleBookClick = () => {
    navigate('/login'); // Navigate to the login page when "Book" button is clicked
  };

  return (
    <header>
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="Logo" className="logo-container" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/#home" className="nav-link">Home</Nav.Link>
              <Nav.Link href="/#places-to-visit" className="nav-link">Places To Visit</Nav.Link>
              <Nav.Link href="/#things-to-do" className="nav-link">Things to Do</Nav.Link>
              <Nav.Link href="/#aboutus" className="nav-link">About Us</Nav.Link>
            </Nav>
            <Button variant="primary" className="book-btn" onClick={handleBookClick}>Book</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
