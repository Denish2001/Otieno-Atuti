import React, { useState, useEffect } from 'react';
import HeroSection from '../HeroSection/HeroSection';
import './AboutUs.css';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const heroText = "Get to Know Us.";
  const heroImage = "./hero.webp"; // Replace with your image URL

  // Slideshow data
  const slides = [
    "We are committed to legal innovation.",
    "Our mission is to deliver exceptional legal solutions.",
    "We value collaboration and strategic advocacy.",
    "Client success is our top priority.",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-transition every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section className="r-wrapper" id="projects">
       <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <HeroSection text={heroText} image={heroImage} />
        </div>

        {/* Slideshow Section */}
        <div className="slideshow-containers">
          <div className="slides secondaryText">
            {slides[currentSlide]}
          </div>

          {/* Previous and Next Buttons */}
          <button className="prev-button" onClick={goToPrevSlide}>
            <img src="./prev.svg" alt="Previous" />
          </button>
          <button className="next-button" onClick={goToNextSlide}>
            <img src="./next.svg" alt="Next" />
          </button>

          {/* Slide Indicators (Small Circles) */}
          <div className="slide-indicatorss">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`indicators ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>

        {/* Mission and Vision Cards */}
        <div className="publications-grid">
          <section className="mission-vision-card">
            <p className="primaryText">Mission</p>
            <p className="secondaryText paddings">
              Our mission is to provide exceptional legal services with integrity, professionalism, and dedication. We strive to achieve the best possible outcomes for our clients by leveraging our extensive expertise, fostering open communication, and maintaining the highest ethical standards. Our commitment is to serve as trusted advisors, delivering innovative and practical solutions to meet the diverse needs of those we represent.
            </p>
          </section>
          <section className="mission-vision-card">
            <p className="primaryText">Vision</p>
            <p className="secondaryText paddings">
              Our vision is to be a leading law firm, globally recognized for excellence, innovation, and unwavering commitment to our clients. We aspire to set the standard in the legal industry by fostering a culture of continuous improvement, diversity, and collaboration. Our goal is to make a meaningful impact on the communities we serve, empower our clients to achieve their objectives, and contribute to the advancement of justice and the rule of law.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;