import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './component/page/HomePage.jsx';
import LoginPage from './component/page/LoginPage.jsx';
import SignUpPage from './component/page/SignUpPage.jsx';
import ForgotPage from './component/page/ForgotPage.jsx';
import AdminDashPage from './component/page/AdminDashPage.jsx';
import DashPage from './component/page/DashPage.jsx';
import PackageSelection from './component/PackageSection.jsx';
import CustomizePackage from './component/CustomizePackage.jsx';
import CreateSection from './component/CreateSection.jsx';
import UpdateSection from './component/UpdateSection.jsx';
import DeleteSection from './component/DeleteSection.jsx';
import UpdateForm from './component/UpdateForm.jsx';
import BookingSection from './component/BookingSection.jsx';
import AdminBooking from './component/AdminBooking.jsx';
import CustomizeHandle from './component/CustomizeHandle.jsx';
function App() {
  const [activeSection, setActiveSection] = useState('packages');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/admindash" element={<AdminDashPage />} />
        
        {/* Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={<DashPage setActiveSection={setActiveSection} activeSection={activeSection} />} 
        />
        
        {/* You could also have specific routes for other sections */}
        <Route path="/package" element={<PackageSelection />} />
        <Route path="/customize-package" element={<CustomizePackage />} />
        <Route path="/booking" element={<BookingSection />} />


        <Route path="/package" element={<PackageSelection />} />
        <Route 
          path="/booking/:packageId"  // Updated to include dynamic packageId parameter
          element={<BookingSection />} 
        />

        <Route 
          path="/admindashboard" 
          element={<AdminDashPage setActiveSection={setActiveSection} activeSection={activeSection} />} 
        />
        
        {/* You could also have specific routes for other sections */}
        <Route path="/create-section" element={<CreateSection />} />
        <Route path="/update-section" element={<UpdateSection />} />
        <Route path="/update-form" element={<UpdateForm />} />
        <Route path="/delete-section" element={<DeleteSection />} />
        <Route path="/admin-booking" element={<AdminBooking />} />
        <Route path="/customize-handle" element={<CustomizeHandle/>} />
       
      
      
      </Routes>
    </Router>
  );
}

export default App;
