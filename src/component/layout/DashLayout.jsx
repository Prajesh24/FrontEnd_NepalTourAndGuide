import React from "react";
import DashNav from './../DashNav.jsx';
const DashLayout = ({ children ,showFooter= true, navbarStyle=""}) => {
  return (
    <>
      <DashNav></DashNav>
      <main>{children}</main>

    </>
  );
};

export default DashLayout;
