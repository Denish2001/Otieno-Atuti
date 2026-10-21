import React, { useState, useRef, useEffect } from "react";
import "./Contact.css";
import { MdCall, MdEmail } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
import HeroSection from "../HeroSection/HeroSection";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";

const EMAILJS = {
  publicKey: "RiNS7lwjgMAZ2jo46",
  serviceId: "service_1xly9mu",
  contactTemplate: "template_huwwvvf",
  newsletterTemplate: "template_f5uouyp",
};

const CONTACT_MODES = [
  {
    id: "call",
    icon: MdCall,
    label: "Call",
    value: "+254 799 816 064",
    href: "tel:+254799816064",
    cta: "Call Now",
  },
  {
    id: "whatsapp",
    icon: BsFillChatDotsFill,
    label: "WhatsApp",
    value: "+254 705 369 048",
    href: "https://wa.me/254705369048",
    cta: "Chat Now",
    external: true,
  },
  {
    id: "email",
    icon: MdEmail,
    label: "Email",
    value: "otienoatuti@gmail.com",
    href: "mailto:otienoatuti@gmail.com",
    cta: "Send an Email",
  },
  {
    id: "sms",
    icon: HiChatBubbleBottomCenter,
    label: "SMS",
    value: "+254 705 369 048",
    href: "sms:+254705369048",
    cta: "Send a Text",
  },
];

const Contact = () => {
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [sendingContact, setSendingContact] = useState(false);
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const alertTimer = useRef(null);

  // Init EmailJS once
  useEffect(() => {
    emailjs.init(EMAILJS.publicKey);
    return () => clearTimeout(alertTimer.current);
  }, []);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(
      () => setAlert((prev) => ({ ...prev, show: false })),
      5000,
    );
  };

  const sendForm = async (templateId, form, successMsg) => {
    try {
      await emailjs.sendForm(
        EMAILJS.serviceId,
        templateId,
        form,
        EMAILJS.publicKey,
      );
      showAlert(successMsg, "success");
      form.reset();
    } catch {
      showAlert("Something went wrong. Please try again.", "error");
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSendingContact(true);
    await sendForm(
      EMAILJS.contactTemplate,
      e.target,
      "Message sent successfully!",
    );
    setSendingContact(false);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setSendingNewsletter(true);
    await sendForm(
      EMAILJS.newsletterTemplate,
      e.target,
      "Subscribed successfully!",
    );
    setSendingNewsletter(false);
  };

  return (
    <section className="c-wrapper" id="contact">
      <AnimatePresence>
        {alert.show && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.25 }}
            className={`alert-notification ${alert.type}`}
          >
            <span>{alert.message}</span>
            <button
              type="button"
              className="alert-close"
              aria-label="Dismiss notification"
              onClick={() => setAlert((prev) => ({ ...prev, show: false }))}
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="paddings innerWidth c-inner"
      >
        <div className="c-head">
          <HeroSection text="Reach out to Us." image="./hero5.webp" />
        </div>

        <div className="c-container">
          {/* Contact form */}
          <div className="card form-container">
            <h3 className="primaryText">Contact Us</h3>
            <p className="secondaryText form-intro">
              Tell us about your matter — we usually respond within one business
              day.
            </p>
            <form onSubmit={handleContactSubmit} noValidate={false}>
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-phone">Phone Number</label>
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+254 700 000 000"
                  autoComplete="tel"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  name="message"
                  rows="6"
                  placeholder="How can we help?"
                  minLength={10}
                  required
                />
              </div>
              <button type="submit" className="btn" disabled={sendingContact}>
                {sendingContact ? "Sending…" : "Submit"}
              </button>
            </form>
          </div>

          {/* Side column */}
          <aside className="right-column">
            <div className="card subscription-card">
              <h3 className="primaryText">Subscribe to Our Newsletter</h3>
              <p className="secondaryText">
                Occasional legal insights. No spam, unsubscribe anytime.
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <label className="sr-only" htmlFor="n-email">
                  Email address
                </label>
                <input
                  id="n-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <button
                  type="submit"
                  className="btn"
                  disabled={sendingNewsletter}
                >
                  {sendingNewsletter ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            </div>

            <div className="card address-card">
              <h3 className="primaryText">Office Address</h3>
              <div className="address-content">
                <img
                  src="./pin.svg"
                  alt=""
                  aria-hidden="true"
                  className="pin-icon"
                />
                <address className="secondaryText">
                  1st Floor, Suite 111, Cianda House
                  <br />
                  Koinange Street, Nairobi
                  <br />
                  P.O. Box 74525-00200
                </address>
                <a
                  className="map-link"
                  href="https://www.google.com/maps/search/?api=1&query=Cianda+House+Koinange+Street"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Contact modes */}
        <section
          className="contact-modes-container"
          aria-label="Other ways to reach us"
        >
          <div className="modes-grid">
            {CONTACT_MODES.map(
              ({ id, icon: Icon, label, value, href, cta, external }) => (
                <div key={id} className="mode">
                  <div className="icon" aria-hidden="true">
                    <Icon size={22} />
                  </div>
                  <div className="details">
                    <span className="primaryText">{label}</span>
                    <span className="secondaryText">{value}</span>
                  </div>
                  <a
                    className="btn btn--ghost"
                    href={href}
                    {...(external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {cta}
                  </a>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Map */}
        <div className="physical-location-container">
          <h3 className="primaryText">Visit Our Office</h3>
          <iframe
            className="location-iframe"
            title="Map showing Cianda House, Koinange Street, Nairobi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8175139019836!2d36.815696573727465!3d-1.2833502356203241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d3dd7dfc47%3A0xfd9e361041633eb7!2sCianda%20House!5e0!3m2!1sen!2ske!4v1718255502038!5m2!1sen!2ske"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
