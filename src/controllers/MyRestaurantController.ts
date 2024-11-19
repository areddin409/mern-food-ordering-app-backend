import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    //1 restaurant per account
    const existingRestaurant = await Restaurant.findOne({
      user: req.userId,
    });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataUri = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataUri);

    //create new restaurant in db
    const newRestaurant = new Restaurant({
      ...req.body,
      imageUrl: uploadResponse.url,
      user: new mongoose.Types.ObjectId(req.userId),
      lastUpdated: new Date(),
    });

    await newRestaurant.save();

    res.status(201).send(newRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating restaurant" });
  }
};

export default {
  createMyRestaurant,
};
