import React from "react";
import OrderItem from "../orderitem/OrderItem.jsx";
import "./orderhistory.css";

const OrderHistory = () => {
  // Example data
  const orders = [
    {
      id: "1001",
      status: "completed",
      date: "25 Aug 2025",
      total: 450,
      items: [
        { id: 1, name: "Paneer Butter Masala", quantity: 2, price: 120 },
        { id: 2, name: "Dal Tadka + Rice", quantity: 1, price: 100 },
      ],
    },
    {
      id: "1002",
      status: "pending",
      date: "26 Aug 2025",
      total: 300,
      items: [
        { id: 3, name: "Chapati Thali", quantity: 3, price: 100 },
      ],
    },
  ];

  return (
    <div className="order-history-container">
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => <OrderItem key={order.id} order={order} />)
      ) : (
        <p>No past orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
