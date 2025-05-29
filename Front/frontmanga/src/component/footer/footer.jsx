import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="social-icons">
          <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
        </div>

        <div className="footer-links">
          <Link to="/mentions-legales" className="footer-link">Mentions légales</Link>
          <span className="separator">|</span>
          <Link to="/cgu" className="footer-link">Conditions Générales d’Utilisation</Link>
        </div>

        <p>© 2024 DREAMANGA. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
