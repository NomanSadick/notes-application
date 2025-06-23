import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["work", "personal", "other"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "blue" },
    },
  },
  { versionKey: false, timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);