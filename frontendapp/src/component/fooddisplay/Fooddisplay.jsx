import React, { useContext } from "react";
import "./fooddisplay.css";
import { StoreContext } from "../../context/StoreContext.jsx";                
import Fooditem from "../fooditem/Fooditem.jsx";

const Fooddisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filtered food list based on category
  const filteredFood = food_list.filter(
    (item) => category === "all" || category === item.category
  );

  return (
    <section className="food-display" id="food-display">
      <h2 className="food-display-title">Top Dishes Near You</h2>
      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((item, index) => (
            <Fooditem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="food-empty-text">No dishes found for this category.</p>
        )}
      </div>
    </section>
  );
};

export default Fooddisplay;

