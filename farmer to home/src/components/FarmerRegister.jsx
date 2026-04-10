import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./FarmerRegister.module.css";

function FarmerRegister() {
  const [form, setForm] = useState({
    farmName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    farmSize: "",
    experience: "",
    specialties: [],
    description: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const specialtyOptions = [
    "Organic Vegetables",
    "Fresh Fruits", 
    "Dairy Products",
    "Grains & Cereals",
    "Herbs & Spices",
    "Flowers",
    "Poultry",
    "Livestock"
  ];

  const handleSpecialtyChange = (specialty) => {
    setForm(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (!form.farmName || !form.ownerName || !form.email || !form.phone || !form.password || !form.location) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
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

    if (form.specialties.length === 0) {
      setError("Please select at least one specialty");
      setIsLoading(false);
      return;
    }

    try {
      // Call backend API for farmer registration
      const res = await fetch("http://localhost:5000/api/farmer-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmName: form.farmName,
          ownerName: form.ownerName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          location: form.location,
          farmSize: form.farmSize,
          experience: form.experience,
          specialties: form.specialties,
          description: form.description
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Farmer registration successful! Please login to continue.");
      setTimeout(() => {
        navigate("/farmer-login");
      }, 2000);
      
    } catch (err) {
      console.error("Registration error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerBox}>
        <div className={styles.farmerHeader}>
          <div className={styles.farmerIcon}> farmer registration</div>
          <h2 className={styles.title}>Farmer Registration</h2>
          <p className={styles.subtitle}>Join our farming community</p>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <h3> Farm Information</h3>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Farm Name *</label>
              <input
                type="text"
                name="farmName"
                value={form.farmName}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="e.g., Green Valley Farm"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Owner Name *</label>
              <input
                type="text"
                name="ownerName"
                value={form.ownerName}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="e.g., John Smith"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="farmer@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="9876543210"
                maxLength={10}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Location *</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="e.g., Nashik, Maharashtra"
                required
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h3> Farm Details</h3>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Farm Size</label>
              <select
                name="farmSize"
                value={form.farmSize}
                onChange={handleInputChange}
                className={styles.formSelect}
              >
                <option value="">Select farm size</option>
                <option value="Less than 1 acre">Less than 1 acre</option>
                <option value="1-5 acres">1-5 acres</option>
                <option value="5-10 acres">5-10 acres</option>
                <option value="10-20 acres">10-20 acres</option>
                <option value="20-50 acres">20-50 acres</option>
                <option value="More than 50 acres">More than 50 acres</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Farming Experience</label>
              <select
                name="experience"
                value={form.experience}
                onChange={handleInputChange}
                className={styles.formSelect}
              >
                <option value="">Select experience</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10-20 years">10-20 years</option>
                <option value="More than 20 years">More than 20 years</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Farm Specialties *</label>
              <div className={styles.specialtyGrid}>
                {specialtyOptions.map(specialty => (
                  <label key={specialty} className={styles.specialtyOption}>
                    <input
                      type="checkbox"
                      checked={form.specialties.includes(specialty)}
                      onChange={() => handleSpecialtyChange(specialty)}
                      className={styles.specialtyCheckbox}
                    />
                    <span className={styles.specialtyLabel}>{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Farm Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className={styles.formTextarea}
                placeholder="Tell us about your farm, practices, and what makes it special..."
                rows="4"
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h3> Security</h3>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Password *</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}> Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Re-enter your password"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`${styles.registerButton} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : " Register as Farmer"}
          </button>
        </form>
        
        <div className={styles.registerLinks}>
          <p className={styles.linkText}>
            Already have a farmer account? 
            <Link to="/farmer-login" className={styles.link}> Login Here</Link>
          </p>
          <p className={styles.linkText}>
            Are you a customer? 
            <Link to="/login" className={styles.link}> Customer Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FarmerRegister;
