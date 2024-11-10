import React from 'react';
import './Header.css'; // Custom styling file for additional adjustments
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img src="/5amlogo.png" alt="5am Group Logo" width="40" height="40" className="mr-2" />
        <span>5am Group</span>
      </Link>
    </header>
  );
}

export default Header;
