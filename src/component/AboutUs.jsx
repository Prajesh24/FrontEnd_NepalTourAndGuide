import React from 'react';
import './../style/AboutUs.css';

const AboutUs = () => {
  return ( 
    <section id="aboutus" className="about-us-container">
      <h2 className="about-title">About Us</h2>
      <div className="about-cards">
        {/* Aim Card */}
        <div className="aboutcard aim-card">
          <h3 className="card-title">Our Aim</h3>
          <p className="card-description">
            Our aim is to make Nepal’s wonders accessible to everyone. We are dedicated to creating a safe, enjoyable, and sustainable experience for our travelers, ensuring that every tour leaves lasting memories.
          </p>
        </div>

        {/* Package Selection Card */}
        <div className="aboutcard  services-card">
          <h3 className="card-title">Package Selection</h3>
          <p className="card-description">
            Choose from a wide range of pre-designed tour packages tailored to suit every interest and budget. Whether it's trekking, cultural exploration, or relaxation, we've got it all.
          </p>
        </div>

        {/* Package Customization Card */}
        <div className="aboutcard  services-card">
          <h3 className="card-title">Package Customization</h3>
          <p className="card-description">
            Customize your travel experience according to your preferences. Whether you want a change in itinerary, accommodation, or activities, we provide flexible packages to meet your needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
