import { Link } from 'react-router-dom';
import './Footer.css';

const SOCIALS = [
  { href: 'https://x.com/AtutiOtieno', label: 'X (Twitter)', icon: 'x.svg' },
  {
    href: 'https://www.instagram.com/_denish.awajo/',
    label: 'Instagram',
    icon: 'instagram.svg',
  },
  {
    href: 'https://www.linkedin.com/company/otieno-atuti-company-advocates/',
    label: 'LinkedIn',
    icon: 'ln.svg',
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61563173245735&sk=about',
    label: 'Facebook',
    icon: 'fb.svg',
  },
];

const FOOTER_LINKS = [
  { to: '/PracticeAreas', label: 'Practice Areas' },
  { to: '/AboutUs', label: 'About Us' },
  { to: '/Team', label: 'Our Team' },
  { to: '/Publications', label: 'Publications' },
  { to: '/Contact', label: 'Contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="f-wrapper">
      <div className="f-inner">
        {/* Top: brand + quick links */}
        <div className="f-top">
          <div className="f-brand">
            <img
              src="/logo2.png"
              alt="Otieno Atuti & Company Advocates"
              className="f-logo"
            />
            <p className="f-tagline">
              Strategic legal counsel. Precision, purpose, and a commitment to
              justice.
            </p>
          </div>

          <nav className="f-nav" aria-label="Footer">
            <span className="f-nav-title">Explore</span>
            <ul>
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="f-contact">
            <span className="f-nav-title">Get in touch</span>
            <a href="mailto:otienoatuti@gmail.com" className="f-contact-line">
              otienoatuti@gmail.com
            </a>
            <a href="tel:+254 799 816 064" className="f-contact-line">
              +254 799 816 064
            </a>
            <p className="f-address">Cianda House, Nairobi, Kenya</p>
          </div>
        </div>

        {/* Divider */}
        <div className="f-divider" aria-hidden="true" />

        {/* Bottom: socials + copyright */}
        <div className="f-bottom">
          <div className="f-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="f-social"
              >
                <img src={s.icon} alt="" />
              </a>
            ))}
          </div>

          <span className="f-copy">
            &copy; {year} Otieno Atuti &amp; Company Advocates. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
