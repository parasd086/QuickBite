import { Request, Response } from "express";
import User from "../models/user";

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

export default {
  createCurrentUser,
};
