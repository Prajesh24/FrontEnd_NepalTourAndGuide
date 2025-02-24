import React, { useState } from 'react';
import DashLayout from './../layout/DashLayout.jsx';
import DashSideBar from './../DashSideBar.jsx';
import PackageSelection from './../PackageSection.jsx'; // Assuming this is your component for the packages
import CustomizePackage from './../CustomizePackage.jsx';
import BookingSection from './../BookingSection.jsx';
const DashPage = () => {
  const [activeSection, setActiveSection] = useState('packages'); // State to manage active section

  return (
    <DashLayout>
      <DashSideBar setActiveSection={setActiveSection} /> {/* Pass setActiveSection to the sidebar */}
      
      {/* Main content area */}
      <div className="main-content">
        {activeSection === 'packages' && <PackageSelection />}
        {activeSection === 'customizePackage' && <CustomizePackage />}
        {activeSection === 'bookings' && <BookingSection />}
        {/* {activeSection === 'bookings' && <Bookings />}  */}
      </div>
    </DashLayout>
  );
};

export default DashPage;
