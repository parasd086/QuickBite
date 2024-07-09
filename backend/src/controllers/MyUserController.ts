import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    //1. Check if the user exists
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    //2. Return the user object to the calling client
    if (existingUser) {
      return res.status(200).send();
    }

    //3. Create the user if it doesn't exist
    const newUser = new User(req.body);
    await newUser.save();

    //toObject = converts a document which will have a bunch of version no. and extra things in it to a plain old JS Object.
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    //form data from FE
    const { name, addressLine1, country, city } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    //send user back to calling client
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating the user" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
