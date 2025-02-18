import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap";  // Make sure to import Modal and Button
import "../style/DashboardSection.css";

const AdminSideBar = ({ setActiveSection }) => {
  // Define the state for showing the logout modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Function to handle logout confirmation
  const handleLogout = () => {
    console.log("Logout button clicked");
    setShowLogoutModal(true); // Show the modal when logout button is clicked
  };

  // Function to confirm logout
  const confirmLogout = () => {
    console.log("Logout confirmed");
    setShowLogoutModal(false);
    // Clear session data (if any)
    // localStorage.removeItem('user');
    // Redirect to the login page after logging out
    window.location.href = "/login";  // Redirect to login
  };

  return (
    <div className="sidebar-container">
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link onClick={() => setActiveSection('create')} className="selection">
            Create Package
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setActiveSection('update')} className="selection">
            Update Package
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setActiveSection('delete')} className="selection">
           Delete Package
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setActiveSection('handle')} className="selection">
           Handle Bookings
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={handleLogout} className="selection logout">
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Logout Confirmation Modal */}
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
    </div>
  );
};

export default AdminSideBar;
