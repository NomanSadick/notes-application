import express from "express";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { z } from "zod";
export const usersRoutes = express.Router();

const CreateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await CreateUserSchema.parseAsync(req.body);
    const body = req.body;
    console.log("Incoming body:", body);
    // console.log("Zod body", body);
    const user = await User.create(body);
    console.log("User created:", user);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error: any) {
    console.error("User creation error:", error);
    res.status(400).json({
      success: false,
      message: "User creation failed",
      error,
    });
  }
});

usersRoutes.get("/get-all-user", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.find(body);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

usersRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user,
  });
});

usersRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.params.userId;
  const user = await User.findByIdAndUpdate(userId, body, { new: true });
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});
