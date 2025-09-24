import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodroute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
//
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config

const app = express();
const port = process.env.PORT || 3000;

//middleware 
;
app.use(cors());//acess backend from any fronetnd 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ...existing code...
// app.use(express.static('view'));
// ...existing code...
app.get("/", (req, res) => {
  res.send("app is working");
});

async function startServer() {
  try {
    await connectDB();
    ///api end point 
    app.use("/api/food", foodRouter);
    app.use("/images",express.static('uploads'))
    app.use("/api/user",userRouter)
    app.use("/api/cart", cartRouter);
    app.use("/api/order",orderRouter);
   

    app.listen(port, () => {
      console.log(`app is running on port number http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}


startServer();

//mongodb+srv://ankitkalbhor3:<db_password>@cluster0.8ufbdxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0