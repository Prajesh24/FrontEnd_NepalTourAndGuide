import React, { useState } from "react";
import "./../style/PlacesToVisit.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import annapurna from './../assets/annapurna.jpg';
import Kanchenjunga from './../assets/Kanchenjunga.jpg';
import Lhotse from './../assets/Lhotse.jpg';
import Makalu from './../assets/Makalu.jpg';
import Everest from './../assets/Mt_ Everest Base Camp.jpeg';
import Dhaulagiri from './../assets/Dhaulagiri.jpg';
import pokhara from './../assets/pokhara.jpeg';
import patan from './../assets/patan.jpeg';
import kathmandu from './../assets/kathmandu.png';
import chitwan from './../assets/chitwan.png';
import Bhaktapur from './../assets/The Amazing UNESCO World Heritage City Of Bhaktapur, Nepal - Hand Luggage Only - Travel, Food And Photography Blog.jpeg';
import swoyambhu from './../assets/swoyambhu.jpeg';
import Muktinath from './../assets/Muktinath.jpg';
import lumbini from './../assets/lumbini.jpg';
import boudha from './../assets/boudha.jpeg';
import Pashupatinath from './../assets/Temple.jpeg';


const PlacesToVisitSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = {
    Mountains: [
      {
        title: "Mount Everest",
        text: "The world's tallest mountain at 8,848m, located in Nepal.",
        img: Everest,
        source: "https://en.wikipedia.org/wiki/Mount_Everest",
      },
      {
        title: "Annapurna",
        text: "Renowned for its trekking routes and diverse landscapes.",
        img: annapurna,
        source: "https://en.wikipedia.org/wiki/Annapurna",
      },
      {
        title: "Kanchenjunga",
        text: "The third-highest peak, straddling the Nepal-India border.",
        img: Kanchenjunga,
        source: "https://en.wikipedia.org/wiki/Kangchenjunga",
      },
      {
        title: "Lhotse",
        text: "The fourth-highest mountain, near Everest, sharing climbing routes.",
        img: Lhotse,
        source: "https://en.wikipedia.org/wiki/Lhotse",
      },
      {
        title: "Makalu",
        text: "A pyramid-shaped peak, the fifth-highest in the world.",
        img: Makalu,
        source: "https://en.wikipedia.org/wiki/Makalu",
      },
      {
        title: "Dhaulagiri",
        text: "The seventh-highest mountain, famed for its snow-capped peaks.",
        img: Dhaulagiri,
        source: "https://en.wikipedia.org/wiki/Dhaulagiri",
      },
    ],

    "Cities and Towns": [
      {
        title: "Kathmandu",
        text: "Capital city with iconic temples and rich heritage.",
        img: kathmandu,
        source: "https://en.wikipedia.org/wiki/Kathmandu",
        
      },
      {
        title: "Pokhara",
        text: "Lakeside city with Himalayan views and adventure sports.",
        img: pokhara,
        source: "https://en.wikipedia.org/wiki/Pokhara",
      },
      {
        title: "Patan",
        text: "Known for Newari architecture and artisan crafts.",
        img: patan,
        source: "https://en.wikipedia.org/wiki/Patan,_Nepal",
      },
      {
        title: "Bhaktapur",
        text: "Medieval city with preserved culture and palaces.",
        img: Bhaktapur,
        source: "https://en.wikipedia.org/wiki/Bhaktapur",
      },
      {
        title: "Chitwan",
        text: "Wildlife and Tharu culture at Chitwan National Park.",
        
        img: chitwan,
        source: "https://en.wikipedia.org/wiki/Chitwan_National_Park",
      },
    ],

    "Pilgrimage Sites": [
      {
        title: "Lumbini",
        text: "Birthplace of Buddha, UNESCO site.",
        img: lumbini,
        source: "https://en.wikipedia.org/wiki/Lumbini",
      },
      {
        title: "Muktinath",
        text: "Sacred for Hindus and Buddhists.",
        img: Muktinath,
        source: "https://en.wikipedia.org/wiki/Muktinath",
      },
      {
        title: "Pashupatinath Temple",
        text: "Famous Shiva temple.",
        img: Pashupatinath,
        source: "https://en.wikipedia.org/wiki/Pashupatinath",
      },

      {
        title: "Swayambhunath Temple",
        text: "Stupa with city views.",
        img: swoyambhu,
        source: "https://en.wikipedia.org/wiki/Swayambhunath",
      },
      {
        title: "Boudhanath Temple",
        text: "Large Tibetan Buddhist stupa.",
        img:boudha,
        source: "https://en.wikipedia.org/wiki/Boudhanath",
      },
    ],
    "World Heritage Sites": [
      {
        title: "Bhaktapur Durbar Square",
        text: "A historic palace with intricate carvings and temples.",
        img: Bhaktapur,
        source: "https://en.wikipedia.org/wiki/Bhaktapur_Durbar_Square",
      },
      {
        title: "Swayambhunath Stupa",
        text: "An iconic stupa offering views of Kathmandu Valley.",
        img: swoyambhu,
        source: "https://en.wikipedia.org/wiki/Swayambhunath",
      },
      {
        title: "Chitwan National Park",
        text: "A UNESCO site with rich wildlife and safari adventures.",
        img: chitwan,
        source: "https://en.wikipedia.org/wiki/Chitwan_National_Park",
      },
      {
        title: "Sagarmatha National Park",
        text: "Home to Mount Everest and unique Himalayan biodiversity.",
        img: Everest,
        source: "https://en.wikipedia.org/wiki/Sagarmatha_National_Park",
      },
      {
        title: "Patan Durbar Square",
        text: "Renowned for its ancient palaces and artistic heritage.",
        img: patan,
        source: "https://en.wikipedia.org/wiki/Patan_Durbar_Square",
      },
      {
        title: "Kathmandu Durbar Square",
        text: "A historic royal square with temples and cultural landmarks.",
        img: kathmandu,
        source: "https://en.wikipedia.org/wiki/Kathmandu_Durbar_Square",
      },
    ],
  };

  return (
    <div className="outer-container" id="places-to-visit">
      <h1>Places to Visit</h1>
      <div className="grid-section">
        {Object.keys(categories).map((category) => (
          <div
            key={category}
            className={`category ${
              selectedCategory === category ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <h2>{category}</h2>
          </div>
        ))}
      </div>
      <div className="card-section">
        {selectedCategory &&
          categories[selectedCategory].map((item, index) => (
            <Card className="card" style={{ width: "18rem" }} key={index}>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.text}</Card.Text>
              
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="learn"
                  >
                    Learn More
                  </a>
                
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default PlacesToVisitSection;
