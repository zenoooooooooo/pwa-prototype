import Project from "../db/models/Project";

export async function fetchProjects() {
  try {
    const projects = await Project.find();

    return {
      message: "Projects fetched successfully",
      status: 200,
      data: projects,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
}
