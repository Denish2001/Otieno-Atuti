import React from 'react';
import './Hero.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Approach from '../Approach/Approach';


const Hero = () => {
  // Settings for the slideshow
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false, // Hide arrows for a cleaner look
    customPaging: (i) => (
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: i === settings.currentSlide ? '#fff' : 'rgba(255, 255, 255, 0.5)', // Active dot is white, others are semi-transparent
          transition: 'all 0.3s ease',
        }}
      />
    ),
  };

  return (
    <section className="hero-wrapper gap" id="home">
      <div className="hero-slider">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div className="slide">
            <img src="./slide.webp" alt="Courtroom" loading='lazy' />
            <div className="slide-content">
              <h1 className='heroText'>Expert Legal Representation</h1>
              <p>We fight for your rights and deliver justice.</p>
              <Link to='/Contact'>
                <motion.button
                  className='button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Consultation
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="slide">
            <img src="./slide3.webp" alt="Lawyer Working" loading='lazy' />
            <div className="slide-content">
              <h1 className='heroText'>Trusted Legal Advisors</h1>
              <p>Providing personalized solutions for your legal needs.</p>
              <Link to='./PracticeAreas'>
                <motion.button
                  className="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Our Services
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="slide">
            <img src="./slide4.webp" alt="Legal Document" loading='lazy'/>
            <div className="slide-content">
              <h1 className='heroText'>Your Rights, Our Priority</h1>
              <p>Committed to protecting your interests.</p>
              <Link to='./AboutUs'>
                <motion.button
                  className="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About Us
                </motion.button>
              </Link>
            </div>
          </div>
        </Slider>
      </div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="story flexCenter publication-grid"
      >
        <div className="publication-cards">
          <motion.img
            src="./team.webp"
            alt="Our Team"
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
              At <strong>Otieno Atuti & Company Advocates</strong>, we believe <strong>all men are equal before the law</strong>, but justice depends on <strong>strong representation</strong>. We're here to ensure every voice is heard.  
              Our firm brings together experienced legal minds and dynamic innovators to provide sharp, strategic solutions. From safeguarding businesses to defending rights and resolving disputes, we approach every case with precision and purpose.  
              With us, justice isn’t just a principle—it’s a commitment.
            </p>
          </motion.div>
        </div>
      </motion.div>
      <Approach/>

      {/* Physical Location Section */}
      <div className="physical-location-container">
        <h3 className="primaryText">Physical Location</h3>
        <iframe
          style={{ height: '400px', width: '80%', marginLeft: '10%', marginRight: '10%', border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8175139019836!2d36.815696573727465!3d-1.2833502356203241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d3dd7dfc47%3A0xfd9e361041633eb7!2sCianda%20House!5e0!3m2!1sen!2ske!4v1718255502038!5m2!1sen!2ske"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Hero;