import React, { useState, useEffect, useRef, useCallback } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/PracticeAreas", label: "Practice Areas" },
  { to: "/AboutUs", label: "About Us" },
  { to: "/Publications", label: "Publications" },
  { to: "/Team", label: "Our Team" },
  { to: "/Contact", label: "Contact Us" },
];

const MOBILE_QUERY = "(max-width: 768px)";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();

  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const closeMenu = useCallback(() => setMenuOpened(false), []);

  /* Header background: transparent over the landing hero, solid everywhere else */
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsTransparent(false);
      return undefined;
    }

    const onScroll = () => {
      const hero = document.getElementById("home");
      const threshold = hero ? hero.offsetHeight * 0.05 : 24;
      setIsTransparent(window.scrollY <= threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  /* Close the menu whenever the route changes */
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  /* Close the menu if the viewport grows past the mobile breakpoint */
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => {
      if (!e.matches) closeMenu();
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [closeMenu]);

  /* While open: lock page scroll, move focus in, handle Escape, trap Tab */
  useEffect(() => {
    if (!menuOpened) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      menuRef.current?.querySelector("a")?.focus();
    });

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const links = Array.from(menuRef.current?.querySelectorAll("a") ?? []);
      const focusable = [...links, toggleRef.current].filter(Boolean);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!focusable.includes(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpened, closeMenu]);

  return (
    <nav
      className={`h-wrapper ${isTransparent ? "transparent" : "solid"}`}
      id="nav"
      aria-label="Main"
    >
      <div className="paddings innerWidth h-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" aria-label="Home">
            <img src="/logo2.png" alt="Logo" className="logo-img" />
          </Link>
        </div>

        {/* Page dimmer behind the mobile drawer */}
        <div
          className={`h-backdrop ${menuOpened ? "open" : ""}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Menu (inline on desktop, slide-in drawer on mobile) */}
        <ul
          id="primary-menu"
          ref={menuRef}
          className={`h-menu ${menuOpened ? "open" : ""}`}
        >
          {NAV_LINKS.map(({ to, label }, index) => {
            const isActive = location.pathname === to;
            return (
              <li key={to} style={{ "--i": index }}>
                <Link
                  to={to}
                  data-label={label}
                  className={isActive ? "active" : ""}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger toggle */}
        <button
          type="button"
          ref={toggleRef}
          className={`h-toggle ${menuOpened ? "open" : ""}`}
          onClick={() => setMenuOpened((prev) => !prev)}
          aria-label={menuOpened ? "Close menu" : "Open menu"}
          aria-expanded={menuOpened}
          aria-controls="primary-menu"
        >
          <span className="h-toggle__bar" />
          <span className="h-toggle__bar" />
          <span className="h-toggle__bar" />
        </button>
      </div>
    </nav>
  );
};

export default Header;
