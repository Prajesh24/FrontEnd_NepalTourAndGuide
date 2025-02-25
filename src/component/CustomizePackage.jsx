import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createCustomizePackage } from './../Api/api.js'; // Import API function
import './../style/AdminDash.css';

const placesByRegion = {
  Kathmandu: ["Pashupatinath Temple", "Swayambhunath Temple", "Bhaktapur Durbar Square"],
  Pokhara: ["Phewa Lake", "Sarangkot", "Devi's Fall"],
  Chitwan: ["Chitwan National Park", "Elephant Breeding Center"],
  Lumbini: ["Maya Devi Temple", "Ashoka Pillar"],
};

const activitiesByRegion = {
  Kathmandu: ["Cultural Tour", "Heritage Walk"],
  Pokhara: ["Boating", "Paragliding"],
  Chitwan: ["Jungle Safari", "Canoeing"],
  Lumbini: ["Pilgrimage Tour", "Meditation Retreat"],
};

const CustomizePackage = () => {
  const [region, setRegion] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [numberOfTravelers, setNumberOfTravelers] = useState("");
  const [includeHotel, setIncludeHotel] = useState(false);
  const [includeFood, setIncludeFood] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customPackage, setCustomPackage] = useState(null);

  const handlePlaceChange = (event) => {
    const { value, checked } = event.target;
    setSelectedPlaces((prev) =>
      checked ? [...prev, value] : prev.filter((p) => p !== value)
    );
  };

  const handleActivityChange = (event) => {
    const { value, checked } = event.target;
    setSelectedActivities((prev) =>
      checked ? [...prev, value] : prev.filter((a) => a !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    if (!region || selectedPlaces.length === 0 || selectedActivities.length === 0 || !numberOfTravelers || !duration || !budget) {
      alert("Please fill in all required fields.");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to submit this package request?");
    if (!isConfirmed) return;

    setLoading(true);

    const packageData = {
      userId,
      region,
      selectedPlaces,
      selectedActivities,
      budget: parseFloat(budget),
      duration: parseInt(duration),
      numberOfTravelers: parseInt(numberOfTravelers),
      includeHotel,
      includeFood,
    };

    try {
      const response = await createCustomizePackage(packageData);
      if (response.status === 201) {
        alert("Package request submitted successfully!");
        setCustomPackage(response.data);
      } else {
        alert("Failed to submit package request.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred while submitting the package.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trav-customize-section">
      <h1>Create Your Own Package</h1>
      <div className="form-section-admin">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="packageRegion">
            <Form.Label>Select the Region</Form.Label>
            <Form.Select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setSelectedPlaces([]);
                setSelectedActivities([]);
              }}
            >
              <option value="">Select a region</option>
              {Object.keys(placesByRegion).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {region && (
            <Form.Group className="mt-3">
              <Form.Label>Select Places to Visit in {region}</Form.Label>
              <div className="mb-2">
                {placesByRegion[region].map((place) => (
                  <Form.Check
                    key={place}
                    type="checkbox"
                    label={place}
                    value={place}
                    checked={selectedPlaces.includes(place)}
                    onChange={handlePlaceChange}
                  />
                ))}
              </div>
            </Form.Group>
          )}

          {region && (
            <Form.Group className="mt-3">
              <Form.Label>Select Activities in {region}</Form.Label>
              <div className="mb-2">
                {activitiesByRegion[region].map((activity) => (
                  <Form.Check
                    key={activity}
                    type="checkbox"
                    label={activity}
                    value={activity}
                    checked={selectedActivities.includes(activity)}
                    onChange={handleActivityChange}
                  />
                ))}
              </div>
            </Form.Group>
          )}

          <Form.Group controlId="numberOfTravelers" className="mt-3">
            <Form.Label>Number of Travelers</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={numberOfTravelers}
              onChange={(e) => setNumberOfTravelers(e.target.value)}
              placeholder="Enter number of travelers"
            />
          </Form.Group>

          <Form.Group controlId="tripDuration" className="mt-3">
            <Form.Label>Trip Duration (in days)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter number of days"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Package Includes</Form.Label>
            <Form.Check
              type="checkbox"
              label="Hotels"
              checked={includeHotel}
              onChange={(e) => setIncludeHotel(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Food"
              checked={includeFood}
              onChange={(e) => setIncludeFood(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Budget (in NPR)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
            {loading ? "Submitting..." : "Submit Package Request"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CustomizePackage;
