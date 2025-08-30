import { Request, Response } from "express";
import Diet from "../models/Diet";

export const saveDiet = async (req: Request, res: Response) => {
  try {
    const diet = new Diet(req.body);
    await diet.save();
    res.status(201).json({ message: "Diet plan saved successfully!", diet });
  } catch (error) {
    res.status(500).json({ error: "Failed to save diet plan", details: error });
  }
};

export const getDiets = async (req: Request, res: Response) => {
  try {
    const diets = await Diet.find().sort({ createdAt: -1 });
    res.json(diets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diets" });
  }
};
