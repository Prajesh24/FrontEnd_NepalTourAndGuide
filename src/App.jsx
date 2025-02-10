import HomePage from './component/page/HomePage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './component/page/LoginPage.jsx';
import SignUpPage from './component/page/SignUpPage.jsx';
import ForgotPage from './component/page/ForgotPage.jsx';
import AdminDashPage from './component/page/AdminDashPage.jsx';
import DashPage from './component/page/DashPage.jsx';
function App() {
  return(
    <>
    
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/forgot" element={<ForgotPage/>}/>
          <Route path="/admindash" element={<AdminDashPage/>}/>
          <Route path="/dashboard" element={<DashPage/>}/>


         
      
      
         

        </Routes>
      </Router>
      </>
 

  );
  
}

export default App

