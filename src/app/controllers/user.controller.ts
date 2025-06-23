import express from 'express';
import { Request, Response } from 'express';
import { User } from '../models/user.model';
export const usersRoutes = express.Router();

usersRoutes.post("/create-user", async (req: Request, res:Response) => {
    const body = req.body;
    const user = await User.create(body);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
    });
});

usersRoutes.get("/get-all-user", async (req: Request, res:Response) => {
    const body = req.body;
    const user = await User.find(body);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
    });
});

usersRoutes.get("/:userId", async (req: Request, res:Response) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user,
    });
});

usersRoutes.patch("/:userId", async (req: Request, res:Response) => {
    const body = req.body;
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, body, { new: true });
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
    });
});

usersRoutes.delete("/:userId", async (req: Request, res:Response) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user,
    });
});