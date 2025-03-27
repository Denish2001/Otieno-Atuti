import React, { useState } from 'react';
import './Team.css';
import HeroSection from '../HeroSection/HeroSection';
import data from '../../utils/team.json';
import { motion } from 'framer-motion';

const Team = () => {
  const heroText = "Our People.";
  const heroImage = "./hero1.webp";
  const [selectedMember, setSelectedMember] = useState(null);

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const closeMemberDetails = () => {
    setSelectedMember(null);
  };

  return (
    <section className="r-wrapper" id="projects">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <HeroSection text={heroText} image={heroImage} />
        </div>

        {/* Team Members Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="publications-grid">
            {data.map((member) => (
              <div
                key={member.id}
                className="publication-card"
                onClick={() => handleCardClick(member)}
              >
                <div className="card-image">
                  <img src={member.image} alt={member.title} loading='lazy'/>
                </div>
                <div className="primaryText">
                  {member.title}
                </div>
                <div className="secondaryText flexCenter">
                  {member.post}
                </div>
              </div>
            ))}
          </motion.div>

        {/* Dedicated Space for Full Member Details */}
        {selectedMember && (
          <div className="member-overlay">
            <div className="member-display">
              <h2>{selectedMember.title}</h2>
              <img src={selectedMember.image} alt={selectedMember.title} loading='lazy'/>
              <div className="member-content">
                <h3>{selectedMember.post}</h3>
                <p>{selectedMember.details}</p>
              </div>
              <button onClick={closeMemberDetails}>Close Info</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;