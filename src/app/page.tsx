"use client";

import { ChartPieLabel } from "@/components/charts/pie-chart";
import { ChartAreaGradient } from "@/components/charts/area-chart";
import { ChartRadarDots } from "@/components/charts/radar-chart";
import { Projects } from "@/components/projects-table";
import { useEffect, useState } from "react";
import { ProjectWithGoals } from "@/interfaces/ProjectWithGoals";
import { IGoal } from "@/interfaces/IGoal";
import { IProject } from "@/interfaces/IProject";

export default function Home() {
  const [projects, setProjects] = useState<ProjectWithGoals[] | []>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);

  const [project, setProject] = useState<ProjectWithGoals | null>(null);
  const [isProjectLoading, setIsProjectLoading] = useState<boolean>(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [projectsRes, goalsRes] = await Promise.all([
          fetch("/api/fetch-projects"),
          fetch("/api/fetch-goals"),
        ]);

        const projectsJson = await projectsRes.json();
        const goalsJson = await goalsRes.json();

        const fullProjects: ProjectWithGoals[] = projectsJson.data.map(
          (project: IProject) => {
            const projectGoals = goalsJson.data.filter(
              (goal: IGoal) => goal.projectId === project._id
            );

            const totalGoals = projectGoals.length;
            const completedGoals = projectGoals.filter(
              (goal: IGoal) => goal.isDone
            ).length;

            const progress =
              totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

            return {
              ...project,
              goals: projectGoals,
              progress: Math.round(progress),
            };
          }
        );

        setProjects(fullProjects);
      } catch (error) {
        console.error("Failed to fetch projects and goals", error);
      } finally {
        setIsProjectsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchProjectAndGoals = async () => {
      if (!selectedProjectId) return;

      try {
        const res = await fetch(`/api/fetch-projects/${selectedProjectId}`);
        const projectJson = await res.json();

        const goalsRes = await fetch(`/api/fetch-goals/${selectedProjectId}`);
        const goalsJson = await goalsRes.json();

        const fullProject = {
          ...projectJson.data,
          goals: goalsJson.data,
        };

        console.log(fullProject);
        setProject(fullProject);
      } catch (error) {
        console.error("Failed to fetch project and goals", error);
      } finally {
        setIsProjectLoading(false);
      }
    };

    setIsProjectLoading(true);
    fetchProjectAndGoals();
  }, [selectedProjectId]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 px-4 py-8 items-stretch">
      <ChartRadarDots project={project} isLoading={isProjectLoading} />
      <ChartAreaGradient project={project} isLoading={isProjectLoading} />
      <ChartPieLabel project={project} isLoading={isProjectLoading} />
      <Projects
        onSelectProject={setSelectedProjectId}
        projects={projects}
        isLoading={isProjectsLoading}
      />
    </div>
  );
}
