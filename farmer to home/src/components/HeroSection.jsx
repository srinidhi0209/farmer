import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/customer-dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-text">
          <h4>FARM TO HOME</h4>
          <h1>Delicious Veggies and Fruits</h1>
          <button className="shop-btn" onClick={handleShopNow}>
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
