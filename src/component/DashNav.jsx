import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import './../style/DashNav.css';
import logo from './../assets/logo.png';

const DashBoardNav = () => {
  return (
    <header>
      <Navbar expand="lg" className="nav-container">
        <Container>
          <div className="banner-scroll-container">
            <img src={logo} alt="Logo" className="banner-scroll-image" />
            <h1 className="banner-scroll-text">Nepal Tour & Guide</h1>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default DashBoardNav;
