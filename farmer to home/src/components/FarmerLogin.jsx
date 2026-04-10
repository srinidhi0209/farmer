import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./FarmerLogin.module.css";

function FarmerLogin({ setRole, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // 🧑‍🌾 Farmer login via backend
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "farmer" }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid farmer credentials!");
        return;
      }

      const userData = { ...data, role: "farmer" };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setSuccess("Farmer logged in successfully!");
      setRole("farmer");
      setTimeout(() => {
        navigate("/farmer-dashboard");
      }, 1000);
    } catch (err) {
      console.error("Farmer login error:", err);
      setError("Server error, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <div className={styles.farmerHeader}>
          <div className={styles.farmerIcon}>👩‍🌾</div>
          <h2 className={styles.title}>Farmer Login</h2>
          <p className={styles.subtitle}>Access your farm management portal</p>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>📧 Email</label>
            <input
              type="email"
              placeholder="farmer@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              required
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>🔐 Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              required
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>

          <button 
            type="submit" 
            className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "🌾 Login to Farm Portal"}
          </button>
        </form>
        
        <div className={styles.farmerInfo}>
          <h3>🌾 Farmer Login</h3>
          <p>Login with your registered farm credentials</p>
          <p>New farmer? <Link to="/farmer-register" className={styles.link}>Register here</Link></p>
        </div>
        
        <div className={styles.loginLinks}>
          <p className={styles.linkText}>
            Are you a customer? 
            <Link to="/login" className={styles.link}> Customer Login</Link>
          </p>
          <p className={styles.linkText}>
            New farmer? 
            <Link to="/register" className={styles.link}> Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FarmerLogin;
