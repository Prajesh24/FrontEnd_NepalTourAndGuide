import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getAllTourPackages, deleteTourPackage } from "./../Api/api.js";
import { createBooking } from './../Api/api'; // Adjust the path if necessary

import "./../style/DashCard.css";

const PackageSection = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data } = await getAllTourPackages();
      console.log("Fetched packages:", data); // Debugging log
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleBooking = async (packageId) => {

    const userId = localStorage.getItem('userId');
    const bookingData = {
      userId,
      packageId,
      bookingStatus: 'Pending',
    };
    console.log('Booking data being sent:', bookingData);
  
    try {
      const response = await createBooking(bookingData);
      console.log('Booking created:', response);
    } catch (error) {
      console.error('Error creating booking:', error.response || error);
    }
  };

  return (
    <div className="package-container">
      <h1>Choose a package</h1>
      <div className="card-container ">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <Card key={pkg.id} className="package-card  card-design">
              <Card.Img
                className="image"
                variant="top"
                src={`http://localhost:3000${pkg.packageImage}`}
              />
              <Card.Body>
                <Card.Title className="title">{pkg.region}</Card.Title>
                <Card.Text className="des">{pkg.description}</Card.Text>

                <div className="places-activities">
                  <p className="places text">
                    Places To Visit:
                    <ul className="list">
                      {Array.isArray(pkg.places) ? (
                        pkg.places.map((place, index) => (
                          <li key={index}>{place}</li>
                        ))
                      ) : (
                        <li>{pkg.places}</li>
                      )}
                    </ul>
                  </p>
                  <p className="activities text">
                    Activities:
                    <ul className="list">
                      {Array.isArray(pkg.activities) ? (
                        pkg.activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))
                      ) : (
                        <li>{pkg.activities}</li>
                      )}
                    </ul>
                  </p>
                </div>
                <div className="trav-dur">
                  <p className="text travelers">
                    Number of Travelers:
                    <li className="list">{pkg.numberOfTravelers}</li>
                  </p>
                  <p className="text duration">
                    Duration:{" "}
                    <li className="list">{pkg.numberOfTravelers} Days</li>
                  </p>
                </div>
                <div className="include-budget">
                  <p className="text">Includes:
                  <ul className="list">
                    {pkg.includeHotel && <li>Hotel</li>}
                    {pkg.includeFood && <li>Food</li>}
                  </ul>
                  </p>
                  <p className="budget text">
                    Budget: <li className="list">Rs {pkg.budget}</li>
                  </p>
                </div>

               

                <Button
  className="booking-btn"
  variant="danger"
  onClick={() => handleBooking(pkg.id)}
>
  Book
</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Loading packages...</p>
        )}
      </div>
    </div>
  );
};

export default PackageSection;
