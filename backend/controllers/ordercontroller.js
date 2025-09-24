import dotenv from "dotenv";
dotenv.config();
import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeorder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const neworder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await neworder.save();
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    if (!req.body.items || req.body.items.length === 0) {
      return res.json({ success: false, message: "No items in cart" });
    }

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Number(item.price) * 100,
      },
      quantity: item.quantity,
    }));

    // Delivery charge
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery charge" },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${neworder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${neworder._id}`,
    });

    res.json({ success: true, message: "Order placed successfully", url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.query; // ⚠️ fixed from req.body to req.query
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error verifying order" });
  }
};

export const getUserOrders = async (req, res) => {
  try{
    const orders=await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error fetching order"})
  }
}
export const listOrders=async (req,res)=>{
  try{
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error fetching order"})
  }
}

export const updateOrderStatus=async(req,res)=>{
try{
   await orderModel.findByIdAndUpdate(req.body.orderId,{Status:req.body.Status})
   res.json({success:true,message:"Order status updated"})
}catch(error){
  console.log(error);
  res.json({success:false,message:"Error updating order status"})
}
}