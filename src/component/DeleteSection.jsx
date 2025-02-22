import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getAllTourPackages, deleteTourPackage } from "./../Api/api.js";
import "./../style/DashCard.css";

const DeleteSection = () => {
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

  const handleDelete = async (id) => {
    console.log("Deleting package with ID:", id); // Debugging log
    if (!id) {
      console.error("Error: Package ID is undefined");
      return;
    }
  
    // Ask for confirmation before proceeding with deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    
    if (confirmDelete) {
      try {
        await deleteTourPackage(id);
        setPackages(packages.filter((pkg) => pkg.id !== id)); // Remove the deleted package from state
      } catch (error) {
        console.error(
          "Error deleting package:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.log("Package deletion canceled.");
    }
  };
  

  return (
    <div className="package-container">
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
                  className="delete-btn"
                  variant="danger"
                  onClick={() => handleDelete(pkg.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No packages to delete</p>
        )}
      </div>
    </div>
  );
};

export default DeleteSection;
