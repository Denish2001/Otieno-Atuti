import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Team.css";
import HeroSection from "../HeroSection/HeroSection";
import data from "../../utils/team.json";

const HERO_TEXT = "Our People.";
const HERO_IMAGE = "./hero1.webp";
const EAGER_IMAGE_COUNT = 4; // first row loads immediately, the rest lazily

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 5l14 14M19 5L5 19"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronIcon = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Team = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const dialogRef = useRef(null);
  const pressStartedOnBackdrop = useRef(false);

  const total = data.length;
  const isOpen = activeIndex !== null;
  const member = isOpen ? data[activeIndex] : null;
  const prevMember = isOpen ? data[(activeIndex - 1 + total) % total] : null;
  const nextMember = isOpen ? data[(activeIndex + 1) % total] : null;

  const step = useCallback(
    (delta) =>
      setActiveIndex((current) =>
        current === null ? current : (current + delta + total) % total,
      ),
    [total],
  );

  const closeDialog = () => dialogRef.current?.close();

  /* Open the native modal dialog. It provides the focus trap, Escape to close,
     an inert background, and focus return to the card that opened it. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) dialog.showModal();
  }, [isOpen]);

  /* Lock page scroll while the dialog is open */
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  /* Close on backdrop click, but not when a text-selection drag ends there */
  const handlePointerDown = (e) => {
    pressStartedOnBackdrop.current = e.target === dialogRef.current;
  };
  const handleClick = (e) => {
    if (pressStartedOnBackdrop.current && e.target === dialogRef.current) {
      closeDialog();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  return (
    <section className="team-wrapper" id="projects">
      <div className="paddings innerWidth team-container">
        <div className="team-head">
          <HeroSection text={HERO_TEXT} image={HERO_IMAGE} loading="eager" />
        </div>

        <ul className="team-grid">
          {data.map((person, index) => (
            <li key={person.id}>
              <button
                type="button"
                className="team-card"
                aria-haspopup="dialog"
                onClick={() => setActiveIndex(index)}
              >
                <span className="team-card__media">
                  {/* Name and role sit right next to the photo, so the image is decorative here */}
                  <img
                    src={person.image}
                    alt=""
                    width="400"
                    height="500"
                    loading={index < EAGER_IMAGE_COUNT ? "eager" : "lazy"}
                    decoding="async"
                    style={
                      person.imagePosition
                        ? { "--pos": person.imagePosition }
                        : undefined
                    }
                  />
                </span>
                <span className="team-card__body">
                  <span className="team-card__name">{person.title}</span>
                  <span className="team-card__role">{person.post}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <dialog
          ref={dialogRef}
          className="team-dialog"
          aria-labelledby="team-dialog-title"
          onClose={() => setActiveIndex(null)}
          onPointerDown={handlePointerDown}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {member && (
            <div className="team-dialog__panel">
              <button
                type="button"
                className="team-dialog__close"
                onClick={closeDialog}
                aria-label="Close profile"
              >
                <CloseIcon />
              </button>

              <figure className="team-dialog__media">
                <img
                  src={member.image}
                  alt={`Portrait of ${member.title}`}
                  decoding="async"
                  style={
                    member.imagePosition
                      ? { "--pos": member.imagePosition }
                      : undefined
                  }
                />
              </figure>

              <div className="team-dialog__content">
                {/* key remounts this region so each profile opens scrolled to the top */}
                <div
                  className="team-dialog__scroll"
                  key={member.id}
                  role="region"
                  aria-labelledby="team-dialog-title"
                  tabIndex={0}
                >
                  <h2 id="team-dialog-title" className="team-dialog__name">
                    {member.title}
                  </h2>
                  <p className="team-dialog__post">{member.post}</p>
                  <p className="team-dialog__details">{member.details}</p>
                </div>

                {total > 1 && (
                  <div className="team-dialog__nav">
                    <button
                      type="button"
                      className="team-nav-btn"
                      onClick={() => step(-1)}
                      aria-label={`Previous: ${prevMember.title}`}
                    >
                      <ChevronIcon direction="left" />
                      <span>Previous</span>
                    </button>

                    <p
                      className="team-dialog__count"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {activeIndex + 1} of {total}
                      <span className="team-sr-only">: {member.title}</span>
                    </p>

                    <button
                      type="button"
                      className="team-nav-btn"
                      onClick={() => step(1)}
                      aria-label={`Next: ${nextMember.title}`}
                    >
                      <span>Next</span>
                      <ChevronIcon direction="right" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </dialog>
      </div>
    </section>
  );
};

export default Team;
