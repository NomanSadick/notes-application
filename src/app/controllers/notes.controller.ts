import express, { Application, Request, Response } from "express";
import { Note } from "../models/notes.model";


export const notesRoutes = express.Router();

notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  const note = await Note.create(body);

  // Aproch 1
  // const myNote = new Note({
  //     title: "Learning Mongoose",
  //     tags: {
  //         label: "Mongoose",
  //     }

  // });

  // await myNote.save()
  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

notesRoutes.get("/get-all-notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({
    success: true,
    message: "Notes fetched successfully",
    notes,
  });
});

notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  res.status(200).json({
    success: true,
    message: "Notes fetched successfully",
    note,
  });
});

notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const body = req.body;
  const note = await Note.findByIdAndUpdate(noteId, body, { new: true });
  res.status(200).json({
    success: true,
    message: "Notes updated successfully",
    note,
  });
});

notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findByIdAndDelete(noteId);
  res.status(200).json({
    success: true,
    message: "Notes deleted successfully",
    note,
  });
});