import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { placeorder ,verifyOrder ,getUserOrders,listOrders,updateOrderStatus} from "../controllers/ordercontroller.js"
const orderRouter = express.Router();

// 🛒 Place an order
orderRouter.post("/place",authMiddleware , placeorder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,getUserOrders);
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateOrderStatus)
export default orderRouter;