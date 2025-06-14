import { IGoal } from "@/interfaces/IGoal";
import { IProject } from "@/interfaces/IProject";
import mongoose, { Schema, Types } from "mongoose";

const GoalSchema = new Schema<IGoal>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  projectId: {
    type: Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    goals: { type: [GoalSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
