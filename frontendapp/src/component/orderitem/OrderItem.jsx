import React from "react";
import "./orderitem.css";

const OrderItem = ({ order }) => {
  return (
    <div className="order-item-card">
      <div className="order-header">
        <p className="order-id">Order #{order.id}</p>
        <p className={`order-status ${order.status.toLowerCase()}`}>{order.status}</p>
        <p className="order-date">{order.date}</p>
      </div>

      <div className="order-items-list">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <p>{item.name}</p>
            <p>Qty: {item.quantity}</p>
            <p>₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="order-total">
        <b>Total: ₹{order.total}</b>
      </div>
    </div>
  );
};

export default OrderItem;
