import React from 'react';
import './Header.css'; // Custom styling file for additional adjustments


function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <a className="navbar-brand d-flex align-items-center" href="#">
        <img src="/5amlogo.png" alt="5am Group Logo" width="40" height="40" className="mr-2" />
        <span>5am Group</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="5amgame/index.html">Drinking Game</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="truth/index.html">Truth or Dare</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/rof">Ring of Fire</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
