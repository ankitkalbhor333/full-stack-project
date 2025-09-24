 import mongoose from "mongoose";
 export const connectDB= async ()=>{
  await mongoose.connect("mongodb+srv://ankitkalbhor3:ankit@cluster0.8ufbdxo.mongodb.net/food-del").then(()=>{
    console.log("connected")
  })
 }