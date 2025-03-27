import React, { useState } from 'react';
import './Publications.css';
import HeroSection from '../HeroSection/HeroSection';
import data from '../../utils/Publications.json';
import { motion } from 'framer-motion';

const Publications = () => {
  const heroText = "Literary Works.";
  const heroImage = "./hero3.webp";
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleCardClick = (publication) => {
    setSelectedArticle(publication);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

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

        {/* Publications Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
         className="publications-grid">
          {data.map((publication) => (
            <div
              key={publication.id}
              className="publication-card"
              onClick={() => handleCardClick(publication)}
            >
              <div className="card-image">
                <img src={publication.image} alt={publication.title} loading='lazy' />
              </div>
              <div className="primaryText">
                {publication.title}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Dedicated Space for Full Article */}
        {selectedArticle && (
          <div className="article-overlay">
            <div className="article-display">
              <h2>{selectedArticle.title}</h2>
              <img src={selectedArticle.image} alt={selectedArticle.title} loading='lazy'/>
              <div className="article-content">
                <h3>Summary</h3>
                <p>{selectedArticle.article.summary}</p>

                {selectedArticle.article.requirements && (
                  <>
                    <h3>Requirements</h3>
                    <ul>
                      {selectedArticle.article.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedArticle.article.foreign_requirements && (
                  <>
                    <h3>Foreign Requirements</h3>
                    <p>{selectedArticle.article.foreign_requirements.description}</p>
                    <ul>
                      {selectedArticle.article.foreign_requirements.additional_documents.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedArticle.article.court_findings && (
                  <>
                    <h3>Court Findings</h3>
                    {selectedArticle.article.court_findings.map((finding, index) => (
                      <div key={index}>
                        <h4>{finding.court}</h4>
                        <p>{finding.ruling}</p>
                      </div>
                    ))}
                  </>
                )}

                {selectedArticle.article.key_takeaways && (
                  <>
                    <h3>Key Takeaways</h3>
                    <ul>
                      {selectedArticle.article.key_takeaways.map((takeaway, index) => (
                        <li key={index}>{takeaway}</li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedArticle.article.steps && (
                  <>
                    <h3>Steps</h3>
                    <ol>
                      {selectedArticle.article.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </>
                )}

                {selectedArticle.article.key_requirements && (
                  <>
                    <h3>Key Requirements</h3>
                    <ul>
                      {selectedArticle.article.key_requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </>
                )}

                <p className="disclaimer">{selectedArticle.disclaimer}</p>
              </div>
              <button onClick={closeArticle}>Close Article</button>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Publications;