import React, { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import "./ArticleModal.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/* ---------- Small presentational pieces ---------- */

const List = ({ items = [], ordered = false }) => {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </Tag>
  );
};

const SECTIONS = [
  {
    key: "requirements",
    title: "Requirements",
    render: (items) => <List items={items} />,
  },
  {
    key: "foreign_requirements",
    title: "Foreign Requirements",
    render: ({ description, additional_documents }) => (
      <>
        <p>{description}</p>
        <List items={additional_documents} />
      </>
    ),
  },
  {
    key: "court_findings",
    title: "Court Findings",
    render: (findings) =>
      findings.map(({ court, ruling }, index) => (
        <div key={index} className="court-finding">
          <h4>{court}</h4>
          <p>{ruling}</p>
        </div>
      )),
  },
  {
    key: "key_takeaways",
    title: "Key Takeaways",
    render: (items) => <List items={items} />,
  },
  {
    key: "steps",
    title: "Steps",
    render: (items) => <List items={items} ordered />,
  },
  {
    key: "key_requirements",
    title: "Key Requirements",
    render: (items) => <List items={items} />,
  },
];

/* ---------- Behaviour hooks ---------- */

const useScrollLock = () => {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
};

const useFocusTrap = (dialogRef, initialFocusRef) => {
  useEffect(() => {
    const trigger = document.activeElement;
    initialFocusRef.current?.focus();

    const handleTab = (event) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll(FOCUSABLE);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => {
      document.removeEventListener("keydown", handleTab);
      trigger?.focus?.();
    };
  }, [dialogRef, initialFocusRef]);
};

/* ---------- Component ---------- */

const ArticleModal = ({ publication, onClose }) => {
  const { title, image, disclaimer, article } = publication;
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useScrollLock();
  useFocusTrap(dialogRef, closeRef);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  const fade = reduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      };

  const lift = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 24, scale: 0.98 },
        transition: { duration: 0.25, ease: "easeOut" },
      };

  return createPortal(
    <motion.div
      className="article-overlay"
      onClick={handleBackdropClick}
      {...fade}
    >
      <motion.div
        ref={dialogRef}
        className="article-display"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        {...lift}
      >
        <header className="article-header">
          <h2 id={titleId}>{title}</h2>
          <button
            type="button"
            className="article-close-icon"
            onClick={onClose}
            aria-label="Close article"
          >
            ×
          </button>
        </header>

        <img src={image} alt="" loading="eager" decoding="async" />

        <div className="article-content">
          <h3>Summary</h3>
          <p>{article.summary}</p>

          {SECTIONS.map(
            ({ key, title: sectionTitle, render }) =>
              article[key] && (
                <section key={key}>
                  <h3>{sectionTitle}</h3>
                  {render(article[key])}
                </section>
              ),
          )}

          {disclaimer && <p className="disclaimer">{disclaimer}</p>}
        </div>

        <footer className="article-footer">
          <button
            ref={closeRef}
            type="button"
            className="article-close"
            onClick={onClose}
          >
            Close Article
          </button>
        </footer>
      </motion.div>
    </motion.div>,
    document.body,
  );
};

export default ArticleModal;
