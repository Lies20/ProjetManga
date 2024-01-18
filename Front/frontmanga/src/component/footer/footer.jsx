import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="social-icons">
          {/* Icônes de réseaux sociaux (à remplacer par vos propres icônes) */}
          <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
        </div>
        <p>© 2024 DREAMANGA. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
