import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { getAllCustomPackages, updateCustomPackageStatus } from './../Api/api.js'; // Ensure API function exists
import "./../style/BookingCard.css";

const CustomizeHandle = () => {
  const [customPackages, setCustomPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCustomPackages = async () => {
      try {
        const response = await getAllCustomPackages();
        setCustomPackages(response);
      } catch (error) {
        setMessage("Error fetching packages.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomPackages();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const confirmChange = window.confirm(`Are you sure you want to mark this package as ${newStatus}?`);
    if (!confirmChange) return;

    try {
      await updateCustomPackageStatus(id, newStatus); // API call to update status
      setCustomPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.id === id ? { ...pkg, status: newStatus } : pkg
        )
      );
      setMessage(`Package successfully marked as ${newStatus}.`);
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("Failed to update package status.");
    }
  };

  return (
    <div>
      <h1>Customized Packages</h1>
      {message && <Alert variant="info">{message}</Alert>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='customize-handle-container'>
          {customPackages.map((packageData) => (
            <Card key={packageData.id} className="customize-handle-card">
              <Card.Body>
                <Card.Title>{packageData.region}</Card.Title>
                <Card.Text>
                  <strong>Created By:</strong> {packageData.User.username}<br />
                  <strong>Places:</strong> {packageData.selectedPlaces.join(', ')}<br />
                  <strong>Activities:</strong> {packageData.selectedActivities.join(', ')}<br />
                  <strong>Number of Travelers:</strong> {packageData.numberOfTravelers}<br />
                  <strong>Duration (days):</strong> {packageData.duration}<br />
                  <strong>Hotel Included:</strong> {packageData.includeHotel ? 'Yes' : 'No'}<br />
                  <strong>Food Included:</strong> {packageData.includeFood ? 'Yes' : 'No'}<br />
                  <strong>Budget:</strong> Rs {packageData.budget}<br />
                  <strong>Status:</strong>
                  <span
                    style={{
                      color:
                        packageData.status === "confirmed"
                          ? "green"
                          : packageData.status === "pending"
                          ? "orange"
                          : packageData.status === "declined" || packageData.status === "cancelled"
                          ? "red"
                          : "black",
                    }}
                  >
                    {packageData.status}
                  </span>
                  <br />
                </Card.Text>
                <Button 
                  variant="success" 
                  className="btn-complete"
                  onClick={() => handleStatusChange(packageData.id, 'confirmed')}
                  disabled={packageData.status === 'confirmed'}
                >
                  Confirm
                </Button>
                <Button 
                  className='btn-decline'
                  variant="danger" 
                  onClick={() => handleStatusChange(packageData.id, 'declined')}
                  disabled={packageData.status === 'declined'}
                >
                  Decline
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomizeHandle;
