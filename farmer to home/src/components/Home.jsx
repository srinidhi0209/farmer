import React from "react";
import HeroSection from "./HeroSection";

function Home() {
  return (
    <>
      <HeroSection />
      <div className="home-content">
        <h2>Welcome to Farm To Home 🌱</h2>
        <p>
          Buy fresh, organic vegetables and fruits directly from local farmers.
          Every purchase supports sustainable agriculture.
        </p>
      </div>
    </>
  );
}

export default Home;
