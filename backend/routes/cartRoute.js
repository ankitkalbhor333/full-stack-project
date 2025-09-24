import express from "express";
import { addToCart, removeFromCart, getCartItems } from "../controllers/cartcontroller.js";
import authMiddleware from "../middlewares/auth.js";
const cartRouter = express.Router();

// 🛒 Add item to cart
cartRouter.post("/add",authMiddleware , addToCart);

// ❌ Remove item from cart
cartRouter.post("/remove",authMiddleware , removeFromCart);

// 📦 Get all items in user cart
cartRouter.post("/get",authMiddleware , getCartItems);

export default cartRouter;
