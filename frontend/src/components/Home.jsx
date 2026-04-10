import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/customer-dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleFarmerLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Farm to Home</h1>
          <p className={styles.heroSubtitle}>Fresh From Farm to Your Table</p>
          <p className={styles.heroDescription}>
            Connect directly with local farmers. Get fresh, organic produce 
            while supporting sustainable agriculture and reducing supply chain costs.
          </p>
          <div className={styles.heroButtons}>
            <button onClick={handleShopNow} className={styles.primaryButton}>
              🛒 Start Shopping
            </button>
            <button onClick={handleFarmerLogin} className={styles.secondaryButton}>
              🌾 Farmer Portal
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Farm to Home?</h2>
        <p className={styles.sectionSubtitle}>
          We're revolutionizing the way you buy fresh produce by connecting you directly with local farmers
        </p>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌱</div>
            <h3 className={styles.featureTitle}>100% Fresh & Organic</h3>
            <p className={styles.featureDescription}>
              Get produce harvested just hours before delivery. No middlemen, no preservatives, just pure freshness.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h3 className={styles.featureTitle}>Fair Prices</h3>
            <p className={styles.featureDescription}>
              Cut out intermediaries and save up to 30% compared to traditional markets while farmers earn more.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚚</div>
            <h3 className={styles.featureTitle}>Fast Delivery</h3>
            <p className={styles.featureDescription}>
              Same-day delivery for orders placed before 12 PM. Track your order from farm to doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.sectionSubtitle}>
          Simple steps to get fresh farm produce at your doorstep
        </p>
        <div className={styles.stepsContainer}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Browse Products</h3>
            <p className={styles.stepDescription}>
              Explore our wide selection of fresh fruits, vegetables, and dairy products from local farms.
            </p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Place Order</h3>
            <p className={styles.stepDescription}>
              Add items to your cart and securely checkout with your preferred delivery time.
            </p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Fresh Delivery</h3>
            <p className={styles.stepDescription}>
              Receive your order directly from the farm, fresh and ready to enjoy.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <h2 className={styles.sectionTitle}>Transforming Agriculture</h2>
        <p className={styles.sectionSubtitle}>
          Creating a sustainable future for farmers and healthier choices for consumers
        </p>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>🌍</div>
            <div className={styles.benefitText}>
              <h3 className={styles.benefitTitle}>Reduced Carbon Footprint</h3>
              <p className={styles.benefitDescription}>
                Shorter supply chains mean less transportation and lower environmental impact.
              </p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>🤝</div>
            <div className={styles.benefitText}>
              <h3 className={styles.benefitTitle}>Support Local Farmers</h3>
              <p className={styles.benefitDescription}>
                Your purchases directly support local farming families and communities.
              </p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>📊</div>
            <div className={styles.benefitText}>
              <h3 className={styles.benefitTitle}>Supply Chain Efficiency</h3>
              <p className={styles.benefitDescription}>
                Eliminating intermediaries reduces costs and improves overall efficiency.
              </p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>🔒</div>
            <div className={styles.benefitText}>
              <h3 className={styles.benefitTitle}>Complete Traceability</h3>
              <p className={styles.benefitDescription}>
              Know exactly where your food comes from and how it was grown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Experience Fresh?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of satisfied customers who are already enjoying farm-fresh produce
            while supporting local farmers and sustainable agriculture.
          </p>
          <button onClick={handleShopNow} className={styles.ctaButton}>
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
