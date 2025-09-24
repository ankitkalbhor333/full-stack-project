// storecontext.jsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  // initialize token immediately from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [food_list, setFoodList] = useState([]);
  const url = "https://food-dev-backend-5umy.onrender.com";

  // Add item to cart (frontend state + backend)
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] ? prev[itemId] + 1 : 1 }));

    // If not logged in, skip backend call
    if (!token) return;

    try {
      // send itemId only; auth middleware should identify user via token
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    } catch (error) {
      console.error("Error adding to cart (backend):", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev };
      updated[itemId] -= 1;
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });

    if (!token) return;

    try {
      // send itemId (backend expects itemId)
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    } catch (error) {
      console.error("Error removing from cart (backend):", error);
    }
  };

  const getTotalCartamount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const itemInfo = food_list.find((product) => product._id === id);
      return itemInfo ? total + itemInfo.price * qty : total;
    }, 0);
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) setFoodList(response.data.data);
    } catch (error) {
      console.error("❌ Server error while fetching food list:", error);
    }
  };

  // NOTE: backend route is POST /api/cart/get — use POST here
  const fetchCart = async () => {
    if (!token) return;
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // fetch food list once
  useEffect(() => {
    fetchList();
  }, []);

  // fetch cart whenever token changes (login/logout)
  useEffect(() => {
    if (token) fetchCart();
    else setCartItems({});
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartamount,
    url,
    token,
    setToken,
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;

