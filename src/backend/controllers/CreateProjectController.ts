import { IProject } from "@/interfaces/Project";
import Project from "../db/models/Project";

export async function createProject(project: IProject) {
  try {
    const newProject = await Project.create(project);

    return {
      message: "Project created successfully",
      status: 201,
      data: newProject,
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
}
