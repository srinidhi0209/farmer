import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar({ cartCount, user, setRole, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setRole("");
    setUser(null);
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <header className={styles.navbarContainer}>
      <Link to="/" className={styles.logo}>🌾 Farm To Home</Link>

      <nav className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/about" className={styles.navLink}>About</Link>
        <Link to="/contact" className={styles.navLink}>Contact</Link>
        <Link to="/cart" className={styles.cartLink}>🛒 Cart ({cartCount})</Link>

        {user && (
          <Link to="/my-orders" className={styles.navLink}>My Orders</Link>
        )}

        {user ? (
          <div className={styles.userSection}>
            <span className={styles.userInfo}>👤 {user.name}</span>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className={styles.loginDropdown}>
              <button onClick={handleLoginClick} className={styles.loginButton}>🛒 Customer Login</button>
              <button onClick={() => navigate('/farmer-login')} className={styles.farmerLoginButton}>🌾 Farmer Login</button>
            </div>
            <div className={styles.registerDropdown}>
              <button onClick={handleRegisterClick} className={styles.registerButton}>🛒 Customer</button>
              <button onClick={() => navigate('/farmer-register')} className={styles.farmerRegisterButton}>🌾 Farmer</button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
