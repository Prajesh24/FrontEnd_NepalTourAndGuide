import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateTourPackage } from "./../Api/api";
import { IoMdArrowRoundBack } from "react-icons/io";

const UpdateForm = ({ selectedPackage, setSelectedPackage }) => {
  const [region, setRegion] = useState(selectedPackage.region);
  const [selectedPlaces, setSelectedPlaces] = useState(selectedPackage.places || []);
  const [selectedActivities, setSelectedActivities] = useState(selectedPackage.activities || []);
  const [duration, setDuration] = useState(selectedPackage.duration || "");
  const [budget, setBudget] = useState(selectedPackage.budget || "");
  const [description, setDescription] = useState(selectedPackage.description || "");
  const [numberOfTravelers, setNumberOfTravelers] = useState(selectedPackage.numberOfTravelers || "");
  const [includeHotel, setIncludeHotel] = useState(selectedPackage.includeHotel || false);
  const [includeFood, setIncludeFood] = useState(selectedPackage.includeFood || false);
  const [preview, setPreview] = useState("");
  const [packageImage, setPackageImage] = useState(null);

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

  useEffect(() => {
    setPreview(selectedPackage.packageImage ? `http://localhost:3000${selectedPackage.packageImage}` : "");
    
    // Reset fields based on selected package
    setRegion(selectedPackage.region);
    setSelectedPlaces(selectedPackage.places || []);
    setSelectedActivities(selectedPackage.activities || []);
    setDescription(selectedPackage.description || "");
    setNumberOfTravelers(selectedPackage.numberOfTravelers || "");
    setDuration(selectedPackage.duration || "");
    setBudget(selectedPackage.budget || "");
    setIncludeHotel(selectedPackage.includeHotel || false);
    setIncludeFood(selectedPackage.includeFood || false);
    setPackageImage(null); // Reset the uploaded image if needed
  }, [selectedPackage]);

  const handlePlaceChange = (e) => {
    const value = e.target.value;
    setSelectedPlaces((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const handleActivityChange = (e) => {
    const value = e.target.value;
    setSelectedActivities((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPackageImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedData = {
      ...selectedPackage,
      region,
      places: selectedPlaces,
      activities: selectedActivities,
      description,
      numberOfTravelers,
      duration,
      budget,
      includeHotel,
      includeFood,
    };
  
    const formData = new FormData();
    formData.append('region', region);
    formData.append('places', JSON.stringify(selectedPlaces));
    formData.append('activities', JSON.stringify(selectedActivities));
    formData.append('description', description);
    formData.append('numberOfTravelers', numberOfTravelers);
    formData.append('duration', duration);
    formData.append('budget', budget);
    formData.append('includeHotel', includeHotel);
    formData.append('includeFood', includeFood);
    if (packageImage) {
      formData.append('packageImage', packageImage);
    }
  
    try {
      await updateTourPackage(selectedPackage.id, formData);  // Pass package ID for the update
      alert('Package Updated Successfully!');
      setSelectedPackage(null);
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Error updating package.');
    }
  };
  

  return (
    <div className="update-form-section">
      <h1>Update Package</h1>
      <IoMdArrowRoundBack onClick={() => setSelectedPackage(null)} />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="packageRegion">
          <Form.Label>Select the Region</Form.Label>
          <Form.Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Select a region</option>
            {Object.keys(placesByRegion).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Select Places to Visit</Form.Label>
          {placesByRegion[region]?.map((place) => (
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
          {activitiesByRegion[region]?.map((activity) => (
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

        <Form.Group controlId="packageDescription" className="mt-3">
          <Form.Label>Package Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
          <Form.Control
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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

        <Form.Group controlId="budget" className="mt-3">
          <Form.Label>Budget (in NPR)</Form.Label>
          <Form.Control
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="packageImage" className="mt-3">
          <Form.Label>Package Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        {preview && (
          <div className="mt-3">
            <img src={preview} alt="Preview" width="200" />
          </div>
        )}

<Button
  variant="primary"
  type="submit"
  className="mt-3"
  disabled={
    !region ||
    selectedPlaces.length === 0 ||
    selectedActivities.length === 0 ||
    !duration ||
    !budget ||
    !numberOfTravelers
  }
>
  Update
</Button>

      </Form>
    </div>
  );
};

export default UpdateForm;
