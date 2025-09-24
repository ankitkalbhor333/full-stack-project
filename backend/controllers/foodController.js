// import { isDeepStrictEqual } from "util";
import foodModel from "../models/foodModel.js";

import fs from "fs";
const addFood=async (req,res)=>{
  console.log(req.body);
let image_filename = req.file ? req.file.filename : "";
const food=new foodModel({
  // _id:req.body._id,
  name:req.body.name,
  description:req.body.description,
  price:Number(req.body.price),
  category:req.body.category,
 image: `${req.protocol}://${req.get("host")}/images/${image_filename}`

})
try{
  await food.save();
  res.json({success:true,message:"food added"})
}catch(error){
  console.log(error)
  res.json({success:false,message:"error"})
}
}

const listFood=async(req,res)=>{
 try{
  const foods=await foodModel.find({});
  res.json({success:true,data:foods})
 }catch(error){
  console.log(error);
  res.json({success:false,message:"error"})
 }
}
  
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;   // ✅ frontend sends { id: foodId }

    if (!id) {
      return res.json({ success: false, message: "⚠️ No ID provided" });
    }

    const food = await foodModel.findById(id);
    if (!food) {
      return res.json({ success: false, message: "❌ Food not found" });
    }

    // ✅ Delete image file (convert URL back to filename)
    if (food.image) {
      const imageName = food.image.split("/images/")[1]; // extract filename
      const imagePath = `uploads/${imageName}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // ✅ Delete from MongoDB
    await foodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "✅ Food removed successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.json({ success: false, message: "❌ Failed to delete food" });
  }
};

// food list
export {addFood,listFood,removeFood}