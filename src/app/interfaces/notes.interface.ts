import { Types } from "mongoose";

export interface INotes {
    title: string;
    content: string;
    category: "work" | "personal" | "other";
    pinned: boolean;
    tags: {
        label: string;
        color: string;
    };
    user : Types.ObjectId;
}