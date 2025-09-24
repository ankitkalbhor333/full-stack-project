import React, { useState } from "react";
import { food_list } from "../../assets/asset";
import "./searchfood.css";

const SearchFood = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFood = food_list.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-food-page">
      <h2>Search Your Favorite Food</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Type food name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="search-results">
        {filteredFood.length > 0 ? (
          filteredFood.map((food) => (
            <li key={food._id} className="search-item">
              <img src={food.image} alt={food.name} className="food-image" />
              <div className="food-info">
                <p className="food-name">{food.name}</p>
                <p className="food-price">₹{food.price}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="no-results">No food items found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchFood;
