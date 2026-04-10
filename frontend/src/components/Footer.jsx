import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3> Farm To Home</h3>
          <p>Connecting local farmers directly to your table with fresh, organic produce.</p>
          <div className="footer-links">
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/register">Get Started</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/customer-dashboard">Shop</a>
            <a href="/cart">Cart</a>
            <a href="/my-orders">My Orders</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p> Email: support@farmtohome.com</p>
          <p> Phone: +91 98765 43210</p>
          <p> Hours: Mon-Sat, 8AM-8PM</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p> {new Date().getFullYear()} Farm To Home. All rights reserved.</p>
        <p>Made with  for farmers and customers</p>
      </div>
    </footer>
  );
}

export default Footer;
