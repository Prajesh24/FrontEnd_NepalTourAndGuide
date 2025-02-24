import React, { useState } from 'react';
import DashLayout from './../layout/DashLayout.jsx';
import AdminSideBar from './../AdminSidebar.jsx';
import CreateSection from './../CreateSection.jsx'; 
import UpdateSection from './../UpdateSection.jsx'; 
import DeleteSection from './../DeleteSection.jsx'; 
import UpdateForm from './../UpdateForm.jsx';
import AdminBooking from './../AdminBooking.jsx';
import CustomizeHandle from './../CustomizeHandle.jsx';
const AdminDashPage = () => {
  const [activeSection, setActiveSection] = useState('create'); // Default section

  return (
    <DashLayout>
      <AdminSideBar setActiveSection={setActiveSection} />
      
      {/* Main Content Area */}
      <div className="main-content">
        {activeSection === 'create' && <CreateSection />}
        {activeSection === 'update' && <UpdateSection />}
        {activeSection === 'update-form' && <UpdateForm />}
        {activeSection === 'delete' && <DeleteSection />}
        {activeSection === 'handle' && <AdminBooking />}
        {activeSection === 'customize' && <CustomizeHandle />}
        
        {/* {activeSection === 'handle' && <HandleBookings />} */}
      </div>
    </DashLayout>
  );
};

export default AdminDashPage;
