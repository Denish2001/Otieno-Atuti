import React, { useState, useCallback } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Approach from '../Approach/Approach';
import './Hero.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Slide data – easily extensible
const SLIDES = [
  {
    id: 1,
    image: './slide.webp',
    alt: 'Courtroom',
    title: 'Expert Legal Representation',
    description: 'We fight for your rights and deliver justice.',
    ctaText: 'Schedule a Consultation',
    ctaLink: '/Contact',
    fetchpriority: 'high', // first slide gets priority
  },
  {
    id: 2,
    image: './slide3.webp',
    alt: 'Lawyer Working',
    title: 'Trusted Legal Advisors',
    description: 'Providing personalized solutions for your legal needs.',
    ctaText: 'Our Services',
    ctaLink: './PracticeAreas',
    fetchpriority: 'auto',
  },
  {
    id: 3,
    image: './slide4.webp',
    alt: 'Legal Document',
    title: 'Your Rights, Our Priority',
    description: 'Committed to protecting your interests.',
    ctaText: 'Learn More About Us',
    ctaLink: './AboutUs',
    fetchpriority: 'auto',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    afterChange: handleSlideChange,
    customPaging: (i) => (
      <div
        className={`custom-dot ${i === currentSlide ? 'active' : ''}`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  return (
    <section className="hero-wrapper gap" id="home">
      <div className="hero-slider">
        <Slider {...settings}>
          {SLIDES.map((slide) => (
            <div key={slide.id} className="slide">
              <img
                src={slide.image}
                alt={slide.alt}
                loading="eager"               // load immediately
                fetchpriority={slide.fetchpriority}
              />
              <div className="slide-content">
                <h1 className="heroText">{slide.title}</h1>
                <p>{slide.description}</p>
                <Link to={slide.ctaLink}>
                  <motion.button
                    className="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slide.ctaText}
                  </motion.button>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="story flexCenter publication-grid"
      >
        <div className="publication-cards">
          <motion.img
            src="./team.webp"
            alt="Our Team"
            loading="eager"   // also above the fold, load eagerly
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="primaryText">Our Story</p>
            <p className="secondaryText">
              At Otieno Atuti & Company Advocates, we believe{' '}
              all men are equal before the law, but justice
              depends on strong representation. We're here to
              ensure every voice is heard. Our firm brings together experienced
              legal minds and dynamic innovators to provide sharp, strategic
              solutions. From safeguarding businesses to defending rights and
              resolving disputes, we approach every case with precision and
              purpose. With us, justice isn’t just a principle—it’s a
              commitment.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <Approach />

      {/* Physical Location Section */}
      <div className="physical-location-container">
        <h3 className="primaryText">Physical Location</h3>
        <iframe
          className="location-iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8175139019836!2d36.815696573727465!3d-1.2833502356203241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d3dd7dfc47%3A0xfd9e361041633eb7!2sCianda%20House!5e0!3m2!1sen!2ske!4v1718255502038!5m2!1sen!2ske"
          title="Office location map"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default Hero;