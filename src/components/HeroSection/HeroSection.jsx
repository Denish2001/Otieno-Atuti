import React from 'react';
import './HeroSection.css'; // Import the CSS for styling
import { motion } from 'framer-motion';

const HeroSection = ({ text, image }) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }} 
        className="hero-container" 
        style={{ backgroundImage: `url(${image})` }}>
      <div className="heroText">
        {text}
      </div>
    </motion.div>
  );
};

export default HeroSection;