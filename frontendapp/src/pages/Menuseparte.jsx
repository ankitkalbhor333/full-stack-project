import React, { useState } from "react";
import Exploremenu from "../component/exploremenu/Exploremenu.jsx";
import Fooddisplay from "../component/fooddisplay/Fooddisplay.jsx";
import "./menu.css";

const Menuseparte = () => {
  const [category, setCategory] = useState("all");

  return (
    <div className="menu-page">
      <section className="menu-explore-section">
        <h2>Explore Our Menu</h2>
        <Exploremenu category={category} setCategory={setCategory} />
      </section>

      <section className="menu-food-display-section">
        <h2>Available Dishes</h2>
        <Fooddisplay category={category} />
      </section>
    </div>
  );
};

export default Menuseparte;
