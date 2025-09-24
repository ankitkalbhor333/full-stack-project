import React, { useContext } from "react";
import { StoreContext } from "../../context/storecontext";
import { useNavigate } from "react-router-dom";
import "./cart.css";

// Single Order Item Component
const CartItem = ({ item, quantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />
      <p>{item.name}</p>
      <p>${item.price}</p>
      <p>{quantity}</p>
      <p>${item.price * quantity}</p>
      <p className="remove-item" onClick={() => removeFromCart(item._id)}>
        x
      </p>
    </div>
  );
};

// Main Cart Page
const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, food_list, removeFromCart, getTotalCartamount } =
    useContext(StoreContext);

  // Convert cart object into an array of items for easier mapping
  const cartArray = Object.entries(cartItems)
    .filter(([id, qty]) => qty > 0)
    .map(([id, qty]) => ({
      ...food_list.find((item) => item._id === id),
      quantity: qty,
    }));

  return (
    <div className="cart">
      <h1 className="cart-title">Your Cart</h1>

      {cartArray.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-header">
              <p>Item</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
            {cartArray.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                quantity={item.quantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <hr />

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-details">
              <p>Subtotal:</p>
              <p>${getTotalCartamount()}</p>
            </div>
            <div className="summary-details">
              <p>Delivery Fee:</p>
              <p>${getTotalCartamount() === 0 ? 0 : 2}</p>
            </div>
            <div className="summary-details total">
              <b>Total:</b>
              <b>${getTotalCartamount() === 0 ? 0 : getTotalCartamount() + 2}</b>
            </div>
            <button onClick={() => navigate("/order")}>Proceed to Checkout</button>
          </div>

          {/* Promo Code */}
          <div className="cart-promocode">
            <p>If you have a promo code, enter it here:</p>
            <div className="promo-input">
              <input type="text" placeholder="Enter promo code" />
              <button>Apply</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
