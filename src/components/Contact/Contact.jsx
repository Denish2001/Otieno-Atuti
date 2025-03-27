import React, { useState } from 'react';
import './Contact.css';
import { MdCall } from 'react-icons/md';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { HiChatBubbleBottomCenter } from 'react-icons/hi2';
import HeroSection from '../HeroSection/HeroSection';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';

const Contact = () => {
  const heroText = 'Reach out to Us.';
  const heroImage = './hero5.webp';
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Initialize EmailJS
  emailjs.init('your_user_id');

  // Show alert function
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 5000);
  };

  // Function to handle the Contact Us form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_1xly9mu',
        'template_huwwvvf',
        e.target,
        'RiNS7lwjgMAZ2jo46'
      )
      .then(
        (result) => {
          showAlert('Message sent successfully!', 'success');
          e.target.reset();
        },
        (error) => {
          showAlert('Failed to send message. Please try again.', 'error');
        }
      );
  };

  // Function to handle the Newsletter Subscription form submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_1xly9mu',
        'template_f5uouyp',
        e.target,
        'RiNS7lwjgMAZ2jo46'
      )
      .then(
        (result) => {
          showAlert('Subscribed successfully!', 'success');
          e.target.reset();
        },
        (error) => {
          showAlert('Failed to subscribe. Please try again.', 'error');
        }
      );
  };

  return (
    <section className="c-wrapper" id="contact">
      {/* Alert Notification */}
      {alert.show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className={`alert-notification ${alert.type}`}
        >
          {alert.message}
          <button 
            className="alert-close" 
            onClick={() => setAlert({ ...alert, show: false })}
          >
            &times;
          </button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="paddings innerWidth r-container"
      >
        <div className="r-head flexCenter">
          <HeroSection text={heroText} image={heroImage} />
        </div>

        {/* Form and Subscription Card */}
        <div className="flexCenter c-container paddings">
          {/* Contact Us Form */}
          <div className="form-container">
            <h3 className="primaryText">Contact Us</h3>
            <form onSubmit={handleContactSubmit}>
              <div className="row">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name.." required />
              </div>
              <div className="row">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" placeholder="Enter your phone number.." required />
              </div>
              <div className="row">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email address.." required />
              </div>
              <div className="row">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Write your message.." rows="6" required />
              </div>
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </div>

          {/* Right Column for Subscription and Location Cards */}
          <div className="right-column">
            {/* Newsletter Subscription Form */}
            <div className="subscription-card">
              <h3 className="primaryText">Subscribe to Our Newsletter</h3>
              <p className="secondaryText">Stay updated with the latest news and updates.</p>
              <form onSubmit={handleNewsletterSubmit}>
                <input type="email" name="email" placeholder="Enter your email address" required />
                <button type="submit" className='button'>Subscribe</button>
              </form>
            </div>

            {/* Physical Address Card */}
            <div className="address-card">
              <h3 className="primaryText">Office Address</h3>
              <div className="address-content">
                <img src="./pin.svg" alt="Location Pin" className="pin-icon" />
                <p className="secondaryText">
                  1st Floor Suite 111 Cianda House Koinange Street<br />
                  P.O. Box 74525-00200
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Modes */}
        <div className="contact-modes-container">
          <div className="flexColStart c-left">
            <div className="flexColStart contactModes">
              <div className="flexStart row">
                {/* Call Mode */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <MdCall size={25} />
                    </div>
                    <div className="flexColStart details">
                      <span className="primaryText">Call</span>
                      <span className="secondaryText">+254 799 816 064</span>
                    </div>
                  </div>
                  <a href="tel:+254705369048" target="_blank" rel="noopener noreferrer">
                    <div className="flexCenter button mode-button">Call Now</div>
                  </a>
                </div>

                {/* WhatsApp Chat Mode */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <BsFillChatDotsFill size={25} />
                    </div>
                    <div className="flexColStart details">
                      <span className="primaryText">WhatsApp Chat</span>
                      <span className="secondaryText">+254 705 369 048</span>
                    </div>
                  </div>
                  <a href="https://wa.me/+254705369048" target="_blank" rel="noopener noreferrer">
                    <div className="flexCenter button mode-button">Chat Now</div>
                  </a>
                </div>

                {/* Email Mode */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <BsFillChatDotsFill size={25} />
                    </div>
                    <div className="flexColStart details">
                      <span className="primaryText">Email</span>
                      <span className="secondaryText">otienoatuti@gmail.com</span>
                    </div>
                  </div>
                  <a href="mailto:otienoatuti@gmail.com">
                    <div className="flexCenter button mode-button">Send an Email</div>
                  </a>
                </div>

                {/* Message Mode */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <HiChatBubbleBottomCenter size={25} />
                    </div>
                    <div className="flexColStart details">
                      <span className="primaryText">Message</span>
                      <span className="secondaryText">+254 705 369 048</span>
                    </div>
                  </div>
                  <a href="#">
                    <div className="flexCenter button mode-button">Message Now</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Location Section */}
        <div className="physical-location-container">
          <h3 className="primaryText">Physical Location</h3>
          <iframe
            style={{ height: '400px', width: '80%', marginLeft: '10%', marginRight: '10%', border: 0}}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8175139019836!2d36.815696573727465!3d-1.2833502356203241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d3dd7dfc47%3A0xfd9e361041633eb7!2sCianda%20House!5e0!3m2!1sen!2ske!4v1718255502038!5m2!1sen!2ske"
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;