import React from "react";
import "./TodayMenuPreview.css";

const TodayMenuPreview = () => {
  const todayMenu = [
    { id: 1, name: "Paneer Butter Masala", price: "₹120", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Dal Tadka + Rice", price: "₹100", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Chapati Thali", price: "₹90", img: "https://via.placeholder.com/150" },
  ];

  return (
    <section className="today-menu">
      <h2 className="today-menu-title">🍲 Today’s Menu</h2>
      <div className="today-menu-grid">
        {todayMenu.map((item) => (
          <div key={item.id} className="today-menu-card">
            <img src={item.img} alt={item.name} className="today-menu-img" />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="today-menu-btn">See Full Menu</button>
      </div>
    </section>
  );
};

export default TodayMenuPreview;
