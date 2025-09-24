import React from "react";
import "./exploremenu.css";
import { menu_list } from "../../assets/asset.js";

const Exploremenu = ({ category, setCategory }) => {
  return (
    <section className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Discover a variety of freshly prepared meals. Choose your favorite
        category and enjoy delicious homemade food delivered right to you.
      </p>

      {/* Menu List */}
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "all" : item.menu_name
              )
            }
            className="explore-menu-list-item"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={category === item.menu_name ? "active" : ""}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </section>
  );
};

export default Exploremenu;
