import React, { useState } from 'react';
import './Team.css';
import HeroSection from '../HeroSection/HeroSection';
import data from '../../utils/team.json';


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
          <HeroSection text={heroText} image={heroImage} loading='eager'/>
        </div>

        {/* Team Members Cards Section */}
        
          <section className="publications-grid">
            {data.map((member) => (
              <div
                key={member.id}
                className="publication-card"
                onClick={() => handleCardClick(member)}
              >
                <div className="card-image">
                  <img src={member.image} alt={member.title} loading='eager'/>
                </div>
                <div className="primaryText">
                  {member.title}
                </div>
                <div className="secondaryText flexCenter">
                  {member.post}
                </div>
              </div>
            ))}
          </section>

        {/* Dedicated Space for Full Member Details */}
        {selectedMember && (
          <div className="member-overlay">
            <div className="member-display">
              <h2>{selectedMember.title}</h2>
              <img src={selectedMember.image} alt={selectedMember.title} loading='eager'/>
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