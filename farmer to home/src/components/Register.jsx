import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.password.trim()) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) {
      setError("Please enter a valid 10-digit phone number");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed!");
        return;
      }

      setSuccess("Registration successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError("Server error, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerBox}>
        <h2 className={styles.title}>Customer Registration</h2>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              className={styles.formInput}
              maxLength={10}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              placeholder="Create a password (min 6 chars)"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              className={styles.formInput}
              required
            />
            {form.password && (
              <div className={`${styles.passwordStrength} ${styles[passwordStrength]}`}>
                Password strength: {passwordStrength}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className={`${styles.registerButton} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Create Account"}
          </button>
        </form>
        
        <p className={styles.loginLink}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
