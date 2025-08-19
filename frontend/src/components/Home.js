import React, { useState } from 'react';
import About from './About';
import Gym from './images/Gym.jpg';
import Squash from './images/Squash2.jpg';
import TableTennis from './images/Tabletennis2..jpg';
import Badminton from './images/badmintono.jpg';
import '../Styles/HomeBG.css';

function Home() {
  const images = [
    { src: Squash, alt: 'Squash' },
    { src: Gym, alt: 'Gym' },
    { src: TableTennis, alt: 'Table Tennis' },
    { src: Badminton, alt: 'Badminton' }
  ];

  return (
    <main className="home-background">
      <div className="content">
      <div className="explore-section">
          <h5>Explore Our Indoor Complex</h5>
          <p>Discover a wide variety of indoor sport facilities.</p>
        </div>

        <div className="gallery"><div className="carousel-container">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="d-block w-100 carousel-image"
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <About />
      </div>
    </main>
  );
}

export default Home;
