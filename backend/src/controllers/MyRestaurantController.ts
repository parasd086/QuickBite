import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    //Check if user already has a restaurant--
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      //409 = duplicate
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }
    //req.file -> file obj will be added as multer.
    const image = req.file as Express.Multer.File;
    //convert image as base64
    const base64Image = Buffer.from(image.buffer).toString("base64");
    //Data URI- is a way to embed the image data directly in HTML or CSS
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    //Now, we have Data URI so now we can upload it to cloudinary-
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    //validations has already be done via middleware
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();

    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMyRestaurant,
  getMyRestaurant,
};
