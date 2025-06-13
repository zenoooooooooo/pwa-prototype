import Project from "../db/models/Project";

export async function fetchProjects() {
  try {
    const projects = await Project.find();

    const projectsWithProgress = projects.map((project) => {
      const totalGoals = project.goals.length;
      const completedGoals = project.goals.filter((goal: IGoal) => goal.isDone).length;

      const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

      return {
        ...project.toObject(), 
        progress: Math.round(progress), 
      };
    });

    return {
      message: "Projects fetched successfully",
      status: 200,
      data: projectsWithProgress,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
}
