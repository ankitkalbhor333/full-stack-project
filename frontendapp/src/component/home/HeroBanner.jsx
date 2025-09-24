import React from "react";
import "./herobanner.css";

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <h1 className="hero-title">
        Fresh Homemade Meals, Delivered Daily 🍱
      </h1>
      <p className="hero-subtitle">
        Healthy • Affordable • On-Time
      </p>
      <div className="hero-buttons">
        <button className="hero-btn-primary">View Menu</button>
        <button className="hero-btn-secondary">Subscribe Now</button>
      </div>
    </section>
  );
};

export default HeroBanner;
