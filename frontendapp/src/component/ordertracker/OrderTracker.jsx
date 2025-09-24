import React from "react";
import "./ordertracker.css";

const OrderTracker = ({ order }) => {
  const stages = ["Pending", "Preparing", "On the way", "Delivered"];

  // Find current stage index
  const currentStage = stages.indexOf(order.status);

  return (
    <div className="order-tracker-card">
      <h3>Order #{order.id} Status</h3>
      <p className="eta">Estimated Delivery: {order.eta}</p>

      <div className="tracker-stages">
        {stages.map((stage, index) => (
          <div key={index} className="stage-container">
            <div
              className={`stage-circle ${index <= currentStage ? "completed" : ""}`}
            >
              {index + 1}
            </div>
            <p className={`stage-label ${index <= currentStage ? "completed" : ""}`}>
              {stage}
            </p>
            {index !== stages.length - 1 && <div className="stage-line"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;
