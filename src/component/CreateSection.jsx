import React, { useState, useContext } from "react";

import { Form, Button } from "react-bootstrap";
import { createTourPackage } from "../Api/api";
import "./../style/AdminDash.css";

const CreateSection = () => {

  const [region, setRegion] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [packageImage, setPackageImage] = useState(null);
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfTravelers, setNumberOfTravelers] = useState("");
  const [includeHotel, setIncludeHotel] = useState(false);
  const [includeFood, setIncludeFood] = useState(false);


  
  const handlePlaceChange = (e) => {
    const value = e.target.value;
    setSelectedPlaces((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPackageImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleActivityChange = (e) => {
    const value = e.target.value;
    setSelectedActivities((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!region || selectedPlaces.length === 0 || selectedActivities.length === 0 || !duration || !budget || !numberOfTravelers) {
      alert("Please fill out all required fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("region", region);
    formData.append("places", JSON.stringify(selectedPlaces));
    formData.append("activities", JSON.stringify(selectedActivities));
    formData.append("description", description);
    formData.append("numberOfTravelers", Number(numberOfTravelers));
    formData.append("duration", Number(duration));
    formData.append("includeHotel", includeHotel);
    formData.append("includeFood", includeFood);
    formData.append("budget", Number(budget));
    if (packageImage) formData.append("packageImage", packageImage);
  
    // Log the form data
    for (let [key, value] of formData.entries()) {
      console.log(key, value);


      // const newPackage = {
      //   region,
      //   description,
      //   image: preview,
      // };
  
      // addPackage(newPackage);
    }
  
    try {
      await createTourPackage(formData);
      alert("Package Created Successfully!");
    } catch (error) {
      console.error("Error creating package:", error);
      alert("Error creating package.");
    }
  };

  const placesByRegion = {
    "Kathmandu Valley": ["Pashupatinath Temple", "Swayambhunath Temple", "Bhaktapur Durbar Square"],
    Pokhara: ["Phewa Lake", "Sarangkot", "Devi's Fall"],
    Chitwan: ["Chitwan National Park", "Elephant Breeding Center"],
    Lumbini: ["Maya Devi Temple", "Ashoka Pillar"],
  };

  const activitiesByRegion = {
    "Kathmandu Valley": ["Cultural Tour", "Heritage Walk"],
    Pokhara: ["Boating", "Paragliding"],
    Chitwan: ["Jungle Safari", "Canoeing"],
    Lumbini: ["Pilgrimage Tour", "Meditation Retreat"],
  };

  return (
    <div className="form-section-admin">
      <h1>Create Package</h1>
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
              <option key={r} value={r}>{r}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {region && (
          <>
            <Form.Group className="mt-3">
              <Form.Label>Select Places to Visit</Form.Label>
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
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Select Activities</Form.Label>
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
            </Form.Group>
          </>
        )}

        <Form.Group controlId="packageImage" className="mt-3">
          <Form.Label>Upload Package Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Package Preview" style={{ width: "100%", maxHeight: "300px" }} />}
        </Form.Group>

        <Form.Group controlId="packageDescription" className="mt-3">
          <Form.Label>Package Description</Form.Label>
          <Form.Control as="textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
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
          <Form.Control type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)} />
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

        <Form.Group controlId="budget" className="mt-3">
          <Form.Label>Budget (in NPR)</Form.Label>
          <Form.Control type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={!region || selectedPlaces.length === 0 || selectedActivities.length === 0 || !duration || !budget || !numberOfTravelers}
        >
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateSection;