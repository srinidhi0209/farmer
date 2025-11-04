import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>About Farm To Home</h3>
        <p>Farm To Home connects local farms directly to your table.</p>
      </div>
      <div>
        <p>© {new Date().getFullYear()} Farm To Home — All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
