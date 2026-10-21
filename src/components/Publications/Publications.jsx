import React, { memo, useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./Publications.css";
import HeroSection from "../HeroSection/HeroSection";
import ArticleModal from "./ArticleModal";
import publications from "../../utils/Publications.json";

const HERO_TEXT = "Literary Works.";
const HERO_IMAGE = "./hero3.webp";

const PublicationCard = memo(function PublicationCard({
  publication,
  onSelect,
}) {
  const { title, image } = publication;

  return (
    <button
      type="button"
      className="publication-card"
      onClick={() => onSelect(publication)}
      aria-haspopup="dialog"
    >
      <span className="card-image">
        <img src={image} alt="" loading="lazy" decoding="async" />
      </span>
      <span className="card-title primaryText">{title}</span>
    </button>
  );
});

const Publications = () => {
  const [selected, setSelected] = useState(null);

  const openArticle = useCallback(
    (publication) => setSelected(publication),
    [],
  );
  const closeArticle = useCallback(() => setSelected(null), []);

  return (
    <section className="r-wrapper" id="projects">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexCenter">
          <HeroSection text={HERO_TEXT} image={HERO_IMAGE} loading="eager" />
        </div>

        <div className="publications-grid">
          {publications.map((publication) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              onSelect={openArticle}
            />
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <ArticleModal
              key={selected.id}
              publication={selected}
              onClose={closeArticle}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Publications;
