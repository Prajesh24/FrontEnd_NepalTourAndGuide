import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap";
import "../style/DashboardSection.css";

const DashSideBar = ({ setActiveSection }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    window.location.href = "/login";
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? "≡" : "☰"}
      </button>
      <div className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link onClick={() => setActiveSection('packages')} className="selection">
              Packages
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setActiveSection('customizePackage')} className="selection">
              Customize Package
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setActiveSection('bookings')} className="selection">
              Bookings
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleLogout} className="selection logout">
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashSideBar;