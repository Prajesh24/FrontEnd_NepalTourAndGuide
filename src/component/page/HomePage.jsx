import React from 'react'
import Layout from './../layout/Layout.jsx';
import Home from './../Homesection.jsx';
import Places from './../PlacesToVisit.jsx';
import Things from './../ThingsToDo.jsx';
import About from './../AboutUs.jsx';
const HomePage = () => {
  return (
   <Layout>
    <Home></Home>
    <Places></Places>
    <Things></Things>
    <About></About>
   </Layout>
  )
}

export default HomePage
