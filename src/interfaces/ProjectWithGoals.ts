import { IProject } from "@/interfaces/IProject";
import { IGoal } from "@/interfaces/IGoal";

export type ProjectWithGoals = IProject & {
  goals: IGoal[];
};