import { Document, Types } from "mongoose";

export interface IGoal extends Document {
  title: String;
  description: String;
  category: string;
  isDone: String;
  projectId: typeof Types.ObjectId;
}
