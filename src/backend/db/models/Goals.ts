import { IGoal } from "@/interfaces/IGoal";
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

export default mongoose.models.Goals ||
  mongoose.model<IGoal>("Goals", GoalSchema);
