// controllers/cartcontroller.js
import UserModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId; // prefer auth middleware
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "userId and itemId required" });
    }

    const userData = await UserModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await UserModel.findByIdAndUpdate(userId, { $set: { cartData } }, { new: true });

    return res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error adding to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "userId and itemId required" });
    }

    const userData = await UserModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};
    if (!cartData[itemId] || cartData[itemId] <= 0) {
      return res.json({ success: false, message: "Item not in cart" });
    }

    cartData[itemId] -= 1;
    if (cartData[itemId] <= 0) delete cartData[itemId];

    await UserModel.findByIdAndUpdate(userId, { $set: { cartData } }, { new: true });

    return res.json({ success: true, message: "Item removed from cart", cartData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error removing from cart" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userData = await UserModel.findById(req.userId);
    if (!userData) return res.json({ success: false, message: "User not found" });
    const cartData = userData.cartData || {};
    return res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error fetching cart items" });
  }
};

export { addToCart, removeFromCart, getCartItems };
