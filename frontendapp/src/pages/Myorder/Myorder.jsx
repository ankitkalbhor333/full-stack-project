import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./Myorder.css";

const Myorder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `${url}/api/order/userorders`,
        { userId },
        { headers: { token } }
      );
      setData(response.data.data || []);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [url, token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {data.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {data.map((order) => (
            <li key={order._id}>
              {/* Header */}
              <div className="order-top">
                <div className="order-id">Order #{order._id}</div>
                <div
                  className={`badge ${
                    order.Status === "cancelled"
                      ? "cancel"
                      : order.Status === "delivered"
                      ? "delivered"
                      : order.Status === "shipped"
                      ? "shipped"
                      : "pending"
                  }`}
                >
                  {order.Status || "Pending"}{" "}
                  {order.payment ? "(Paid)" : "(Unpaid)"}
                </div>
              </div>

              {/* Items */}
              <div className="order-items">
                {order.items?.map((item) => (
                  <div key={item._id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <span>
                        ₹{item.price} × {item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address & Amount */}
              <div className="order-details">
                <div className="order-meta">
                  <div>
                    <strong>Address:</strong>{" "}
                    {order.address?.firstName} {order.address?.lastName},{" "}
                    {order.address?.street}, {order.address?.city},{" "}
                    {order.address?.state} - {order.address?.zipcode}
                  </div>
                  <div>
                    <strong>Email:</strong> {order.address?.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {order.address?.phone}
                  </div>
                </div>

                <div className="order-price">
                  <span className="label">Total</span>
                  <span className="amount">₹{order.amount}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="order-footer">
                <div className="order-date">
                  {new Date(order.date).toLocaleString()}
                </div>
                <button onClick={fetchOrders} className="order-action">
                  Track order
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Myorder;

