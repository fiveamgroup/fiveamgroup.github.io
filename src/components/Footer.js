import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <p>Follow us on</p>
      <a href="https://www.tiktok.com/@demariner" className="text-white" target="_blank" rel="noreferrer">
        <i className="fab fa-tiktok"></i> Tiktok
      </a> |
      <a href="https://discord.gg/c4FXRxX5TA" className="text-white" target="_blank" rel="noreferrer">
        <i className="fab fa-discord"></i> Discord
      </a> |
      <a href="steam/index.html" className="text-white" target="_blank" rel="noreferrer">
        <i className="fab fa-steam"></i> Steam
      </a>
      <p>&copy; 2024 5am Group. All rights reserved.</p>
      <small>Created by DeMariner</small>
    </footer>
  );
}

export default Footer;
