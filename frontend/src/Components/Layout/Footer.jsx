import React from "react";
import '../LandingPage/styles/LandingPage.css'; 

const Footer = () => {
  return (
    <footer className="landing-page-footer">
          <div className="footer-content">
            <div className="footer-links">
              <h3>Useful Links</h3>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#faq">FAQs</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>Contact Us</h3>
              <p>Email: support@careerboost.com</p>
              <p>Phone: +123 456 7890</p>
              <p>Address: 123 Gyan Circle, Sri City</p>
            </div>
            <div className="footer-socials">
              <h3>Follow Us</h3>
              <ul>
                <li><a href="https://facebook.com">Facebook</a></li>
                <li><a href="https://twitter.com">Twitter</a></li>
                <li><a href="https://instagram.com">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Career Boost. All Rights Reserved.</p>
          </div>
    </footer>
  );
};

export default Footer;
