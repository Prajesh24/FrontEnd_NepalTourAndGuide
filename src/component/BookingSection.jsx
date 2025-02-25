import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import {
  getAllBookings,
  updateBookingStatus,
  getAllCustomPackages,
  updateCustomPackageStatus,
} from "../Api/api"; // Ensure getAllCustomPackages is imported
import "./../style/BookingCard.css";

const BookingSection = () => {
  const [bookings, setBookings] = useState([]);
  const [customPackages, setCustomPackages] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBookings();
    fetchCustomPackages();
  }, []);

  // Function to fetch all bookings and filter for the current user
  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get the logged-in user's ID from localStorage
      if (!userId) {
        setError("User not logged in");
        return;
      }

      const response = await getAllBookings(); // Fetch all bookings
      console.log("All bookings fetched:", response.data.bookings); // Debugging

      // Filter bookings for the current user
      const userBookings = response.data.bookings.filter(
        (booking) => booking.userId === parseInt(userId) // Ensure userId is a number
      );

      console.log("Filtered bookings for user:", userBookings); // Debugging

      if (userBookings.length === 0) {
        setMessage("No bookings found for this user.");
      }

      setBookings(userBookings);
    } catch (error) {
      setError("Failed to fetch bookings");
      console.error("Error fetching bookings:", error);
    }
  };

  // Function to fetch all customized packages and filter for the current user
  const fetchCustomPackages = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get the logged-in user's ID from localStorage
      if (!userId) {
        setError("User not logged in");
        return;
      }

      const response = await getAllCustomPackages(); // Fetch all customized packages
      console.log("All customized packages fetched:", response); // Debugging

      // Filter customized packages for the current user
      const userCustomPackages = response.filter(
        (packageData) => packageData.userId === parseInt(userId) // Ensure userId is a number
      );

      console.log("Filtered customized packages for user:", userCustomPackages); // Debugging

      if (userCustomPackages.length === 0) {
        setMessage("No customized packages found for this user.");
      }

      setCustomPackages(userCustomPackages);
    } catch (error) {
      setError("Error fetching customized packages.");
      console.error(error);
    }
  };

  // Function to handle canceling a booking
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      fetchBookings(); // Refresh bookings after update
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Function to handle status change for customized packages
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateCustomPackageStatus(id, newStatus); // API call to update status
      fetchCustomPackages(); // Refresh customized packages after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Function to handle canceling a booking with confirmation
  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return; // If the user clicks 'No', do nothing

    try {
      await updateBookingStatus(bookingId, "cancelled");
      fetchBookings(); // Refresh bookings after update
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Function to handle status change for customized packages with confirmation
  const handleCancelCustomPackage = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this customized package?"
    );
    if (!confirmCancel) return; // If the user clicks 'No', do nothing

    try {
      await updateCustomPackageStatus(id, "cancelled");
      fetchCustomPackages(); // Refresh customized packages after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="booking-section-container">
      {message && <Alert variant="info">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <h1>Your Bookings</h1>

      {/* Display bookings if available */}
      {bookings.length > 0 ? (
        <div className="booking-cards">
          {bookings.map((booking) => (
            <Card key={booking.bookingId} className="booking-card-traveler">
              <Card.Body>
                <Card.Title>Booking ID: {booking.bookingId}</Card.Title>
                <Card.Text>
                  <strong>Booked by:</strong> {booking.userName}
                  <br />
                  <strong>Region:</strong> {booking.region}
                  <br />
                  <strong>Places:</strong> {JSON.stringify(booking.places)}
                  <br />
                  <strong>Activities:</strong>{" "}
                  {JSON.stringify(booking.activities)}
                  <br />
                  <strong>Number of Travelers:</strong>{" "}
                  {booking.numberOfTravelers}
                  <br />
                  <strong>Budget:</strong> Rs {booking.budget}
                  <br />
                  <strong>Places:</strong> {JSON.stringify(booking.places)}
                  <br />
                  <strong className="status">Status:</strong>
                  <span
                    style={{
                      color:
                        booking.bookingStatus === "confirmed"
                          ? "green"
                          : booking.bookingStatus === "pending"
                          ? "orange"
                          : booking.bookingStatus === "declined" ||
                            booking.bookingStatus === "cancelled"
                          ? "red" // Both "declined" and "cancelled" will be red
                          : "black",
                    }}
                  >
                    {booking.bookingStatus}
                  </span>
                </Card.Text>
                {/* Cancel button for bookings */}
                <Button
                  className="btn-cancel"
                  variant="danger"
                  onClick={() => handleCancelBooking(booking.bookingId)}
                  disabled={booking.bookingStatus === "cancelled"}
                >
                  Cancel Booking
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}

      <h1>Customized Packages</h1>

      {/* Display customized packages if available */}
      {customPackages.length > 0 ? (
        <div className="custom-packages">
          {customPackages.map((packageData) => (
            <Card key={packageData.id} className="booking-card-traveler">
              <Card.Body>
                <Card.Title>{packageData.region}</Card.Title>
                <Card.Text>
                  <strong>Created By:</strong> {packageData.User.username}
                  <br />
                  <strong>Places:</strong>{" "}
                  {packageData.selectedPlaces.join(", ")}
                  <br />
                  <strong>Activities:</strong>{" "}
                  {packageData.selectedActivities.join(", ")}
                  <br />
                  <strong>Number of Travelers:</strong>{" "}
                  {packageData.numberOfTravelers}
                  <br />
                  <strong>Duration (days):</strong> {packageData.duration}
                  <br />
                  <strong>Hotel Included:</strong>{" "}
                  {packageData.includeHotel ? "Yes" : "No"}
                  <br />
                  <strong>Food Included:</strong>{" "}
                  {packageData.includeFood ? "Yes" : "No"}
                  <br />
                  <strong>Budget:</strong> Rs {packageData.budget}
                  <br />
                  <strong>Status:</strong>
                  <span
                    style={{
                      color:
                        packageData.status === "confirmed"
                          ? "green"
                          : packageData.status === "pending"
                          ? "orange"
                          : packageData.status === "declined" ||
                            packageData.status === "cancelled"
                          ? "red" // Both "declined" and "cancelled" will be red
                          : "black",
                    }}
                  >
                    {packageData.status}
                  </span>
                  <br />
                </Card.Text>
                <Button
                  className="btn-cancel"
                  variant="danger"
                  onClick={() => handleCancelCustomPackage(packageData.id)}
                  disabled={packageData.status === "cancelled"}
                >
                  Cancel Booking
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No customized packages found.</p>
      )}
    </div>
  );
};

export default BookingSection;
