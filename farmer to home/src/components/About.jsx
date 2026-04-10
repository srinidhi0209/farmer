import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>About Farm to Home</h1>
        <p className={styles.subtitle}>
          Connecting local farmers directly with customers to ensure fresh produce, 
          fair pricing, and sustainable agriculture for everyone.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.missionSection}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.sectionContent}>
            Farm to Home is revolutionizing the agricultural supply chain by eliminating intermediaries 
            and creating direct connections between farmers and consumers. We believe in fresh, 
            organic produce that's accessible to everyone while ensuring farmers get fair prices 
            for their hard work.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌾</div>
            <h3 className={styles.featureTitle}>100% Fresh Produce</h3>
            <p className={styles.featureDescription}>
              All our products are harvested fresh and delivered directly from farms to your doorstep.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h3 className={styles.featureTitle}>Fair Prices</h3>
            <p className={styles.featureDescription}>
              Cut out the middlemen and save money while farmers earn more for their quality produce.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌍</div>
            <h3 className={styles.featureTitle}>Sustainable Future</h3>
            <p className={styles.featureDescription}>
              Supporting local farming communities and promoting environmentally friendly agricultural practices.
            </p>
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Partner Farmers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50,000+</div>
              <div className={styles.statLabel}>Happy Customers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Organic Products</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24hrs</div>
              <div className={styles.statLabel}>Fresh Delivery</div>
            </div>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Join the Farm to Home Movement</h2>
          <p className={styles.ctaDescription}>
            Be part of a community that values fresh, healthy food and supports local farmers. 
            Together, we can create a more sustainable and equitable food system.
          </p>
          <Link to="/register" className={styles.ctaButton}>
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
