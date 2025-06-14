import { Document, Types } from "mongoose";

export interface IGoal extends Document {
  title: string;
  description: string;
  category: string;
  isDone: boolean;
  projectId: typeof Types.ObjectId;
}
