import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getAllBookings, updateBookingStatus } from "../Api/api"; // Import update function
import "./../style/BookingCard.css";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      console.log("Bookings fetched:", response.data);
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${status} this booking?`
    );

    if (confirmation) {
      try {
        await updateBookingStatus(bookingId, status);
        fetchBookings(); // Refresh bookings after update
        alert(`Booking successfully ${status}.`);
      } catch (error) {
        console.error("Error updating booking status:", error);
        alert("Failed to update booking status. Please try again.");
      }
    }
  };

  return (
    <div className="admin-booking-container">
      <h1>Booking Details</h1>
      <div className="booking-cards">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking.bookingId} className="booking-card">
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
                  <strong>Duration (days):</strong> {booking.duration}
                  <br />
                  <strong>Includes Hotel:</strong>{" "}
                  {booking.includeHotel ? "Yes" : "No"}
                  <br />
                  <strong>Includes Food:</strong>{" "}
                  {booking.includeFood ? "Yes" : "No"}
                  <br />
                  <strong>Budget:</strong> Rs {booking.budget}
                  <br />
                  <strong>Status:</strong>
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
                <Button
                  className="btn-complete"
                  variant="success"
                  onClick={() =>
                    handleStatusUpdate(booking.bookingId, "confirmed")
                  }
                  disabled={booking.bookingStatus === "confirmed"}
                >
                  Confirm
                </Button>{" "}
                <Button
                  className="btn-decline"
                  variant="danger"
                  onClick={() =>
                    handleStatusUpdate(booking.bookingId, "declined")
                  }
                  disabled={booking.bookingStatus === "declined"}
                >
                  Decline
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBooking;
