import express, { Application, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import { Note } from "./models/notes.model";
import { notesRoutes } from "./controllers/notes.controller";
import { usersRoutes } from "./controllers/user.controller";

const app: Application = express();
app.use(express.json());


app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
