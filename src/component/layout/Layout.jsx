import React from 'react';
import Navbar from './../NavBar.jsx';
import Footer from './../Footer.jsx';
const Layout = ({ children, showfooter=true }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {showfooter && <Footer/>}
    </>
  );
}

export default Layout;
