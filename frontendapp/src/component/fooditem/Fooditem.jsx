import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";
import Rating from "./Rating.jsx";
import ToastNotification from "../notification/ToastNotification.jsx";
import "./fooditem.css";

const Fooditem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [toast, setToast] = useState(null);

  const handleAdd = () => {
    addToCart(id);
    setToast({ message: `${name} added to cart!`, type: "success" });
  };

  const handleRemove = () => {
    removeFromCart(id);
    setToast({ message: `${name} removed from cart!`, type: "error" });
  };

  return (
    <div className="food-item-card">
      {/* Image + Add/Counter */}
      <div className="food-item-img-container">
       <img
  src={image}
  alt={name}
  className="food-item-image"
/>


        {!cartItems[id] ? (
          <button className="add-button" onClick={handleAdd}>+</button>
        ) : (
          <div className="food-item-counter">
            <button className="counter-btn" onClick={handleRemove}>-</button>
            <p>{cartItems[id]}</p>
            <button className="counter-btn" onClick={handleAdd}>+</button>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="food-item-info">
        <div className="food-item-header">
          <h3 className="food-item-name">{name}</h3>
          <Rating />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">{price}₹</p>
        <Link to="/cart" className="menu-button">
          Go to Cart
        </Link>
      </div>

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Fooditem;

