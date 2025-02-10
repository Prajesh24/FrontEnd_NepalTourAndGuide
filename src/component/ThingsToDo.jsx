import React from 'react'
import './../style/ThingsToDo.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const ThingsToDo = () => {
  return (
    <>
   
    <Carousel id='things-to-do'className='things-to-do'>
     
      <Carousel.Item >
        <div className='first-slide height'>
          
          <h1 className='title-style'>Adventure</h1>
          <div className='adventure-list'>
          <ul>
            <li>TREKKING</li>
            <li>SKY DIVING</li>
            <li>HIKING</li>
            <li>PARAGLIDING</li>
            <li>RAFTING</li>
            
          </ul>
          <ul className='second-list'>
          <li>CAMPING</li>
            <li>BUNJEE JUMPING</li>
            <li>CAVE EXPLORATION</li>
            <li>MOTOR BIKING</li>
            <li>ZIP FLYING</li>

          </ul>
          </div>
          </div> 
    
      </Carousel.Item>
      <Carousel.Item >
      <div className='second-slide height'text="Second slide">
      <h1 className='culture-style'>Culture</h1>
          <div className='culture-list'>
          <ul>
            <li>TRADITIONAL CRAFT</li>
            <li>HERITAGE WALK</li>
            <li>MUSEUM TOURS</li>
            <li>CULTURAL TOURS</li>
            
          </ul>
          <ul className='second-list'>
          <li>JATRAS</li>
            <li>FESTIVALS</li>
            <li>KUMARI</li>
            <li>HISTORICAL PLACES</li>
  

          </ul>
          </div>
        
         </div>
        
      </Carousel.Item>
      <Carousel.Item>
      <div className='third-slide height'>
      <h1 className='nature-style'>Nature</h1>
          <div className='nature-list'>
          <ul>
            <li>BIRD WATCHING</li>
            <li>NATIONAL PARK</li>
            <li>MOUNTAIN VIEWING</li>
            <li>LAKESIDE CHILLING</li>
           
            
          </ul>
          <ul className='second-list'>
          <li>JUNGLE DISCOVERY</li>
            <li>CAVE EXPLORATION</li>
            <li>REGIONAL DIVERSIFICATION</li>
            <li>RARE ANIMALS</li>


          </ul>
          </div>


      </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='fourth-slide height'>
      <h1 className='food-style'>Food</h1>
          <div className='food-list'>
          <ul>
            <li>NEWARI DISH</li>
            <li>THAKALI</li>
            <li>DHEDO</li>
            <li>JUJU DHAU</li>
           
            
          </ul>
          <ul className='second-list'>
          <li>MOMO</li>
            <li>SEL ROTI</li>
            <li>CHYANG</li>
            <li>GUUNDRUK</li>


          </ul>
        </div>

      </div>
      </Carousel.Item>
      
    </Carousel>
    </>
  )
}

export default ThingsToDo