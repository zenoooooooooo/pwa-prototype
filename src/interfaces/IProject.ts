import { Document } from "mongoose";

export interface IProject extends Document {
  title: String;
  description: String;
  goals: IGoal[];
}
