import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import { v2 as cloudinary } from "cloudinary";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";

//casting/force this type to be a string
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

//will automatically convert the body of any req we make to our API server to JSON
app.use(express.json());
app.use(cors());

//Health-endpoint
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});

app.get("/", (req: Request, res: Response) => {
  res.send(`Frontend........<a href="https://quickbite-eyni.onrender.com"> Frontend </a> 
  <br> <br>
  Health........<a href="/health">/health</a>`);
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
  console.log("Server started ");
});
