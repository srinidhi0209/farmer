import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/api";
import styles from "./Login.module.css";

function Login({ setRole, setUser }) {
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

    // 👩‍💼 Customer login via backend
    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid credentials!");
        return;
      }

      const userData = { ...data, role: "customer" };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setSuccess("Customer logged in successfully!");
      setRole("customer");
      setTimeout(() => {
        navigate("/customer-dashboard");
      }, 1000);
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <div className={styles.customerHeader}>
          <div className={styles.customerIcon}>👩‍💼</div>
          <h2 className={styles.title}>Customer Login</h2>
          <p className={styles.subtitle}>Access your shopping portal</p>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>📧 Email</label>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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
            {isLoading ? "Logging in..." : "🛒 Customer Login"}
          </button>
        </form>
        
        <div className={styles.loginLinks}>
          <p className={styles.linkText}>
            Are you a farmer? 
            <Link to="/farmer-login" className={styles.link}> Farmer Login</Link>
          </p>
          <p className={styles.linkText}>
            New customer? 
            <Link to="/register" className={styles.link}> Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
