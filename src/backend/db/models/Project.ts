import { IProject } from "@/interfaces/IProject";
import mongoose, { Schema, Document, Types } from "mongoose";

const GoalSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    isDone: { type: Boolean, default: false },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    goals: { type: [GoalSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
