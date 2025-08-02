// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="app-footer">
      {/* إضافة زر للعودة إلى الصفحة الرئيسية */}
      <Link to="/" className="footer-home-link">
        Back to Home
      </Link>
      <p>&copy; {new Date().getFullYear()} Food App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;