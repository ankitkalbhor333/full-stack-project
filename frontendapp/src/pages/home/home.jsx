import React, { useState } from "react";
import "./home.css";

// Common Components
import Header from "../../component/header/header.jsx";
import Exploremenu from "../../component/exploremenu/Exploremenu.jsx";
import Fooddisplay from "../../component/fooddisplay/Fooddisplay.jsx";
import Appdowload from "../../component/appdowload/appdowload.jsx";
import Footer from "../../component/footer/footer.jsx";

// Home Page Exclusive Components
import HeroBanner from "../../component/home/HeroBanner.jsx";
import TodayMenuPreview from "../../component/home/TodayMenuPreview.jsx";
import SubscriptionPlansStrip from "../../component/home/SubscriptionPlansStrip.jsx";

const Home = () => {
  const [category, setCategory] = useState("all");

  return (
    <div className="home-page">
      <Header />

      <section className="hero-section">
        <HeroBanner />
      </section>

      <section className="today-menu-section">
        <TodayMenuPreview />
      </section>

      <section className="subscription-plans-section">
        <SubscriptionPlansStrip />
      </section>

      <section className="explore-menu-section">
        <Exploremenu category={category} setCategory={setCategory} />
      </section>
       

      <section className="food-display-section">
        <Fooddisplay category={category} />
      </section>
      <section className="food-display-section">
        <Appdowload category={category} />
      </section>

    </div>
  );
};

export default Home;
