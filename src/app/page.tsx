"use client";
import { ChartPieLabel } from "@/components/charts/pie-chart";
import { ChartAreaGradient } from "@/components/charts/area-chart";
import { ChartRadarDots } from "@/components/charts/radar-chart";
import { Projects } from "@/components/projects-table";
import { useEffect, useState } from "react";
import { IProject } from "@/interfaces/IProject";

export default function Home() {
  const [projects, setProjects] = useState<[] | IProject[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);

  const [project, setProject] = useState<IProject | null>(null);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/fetch-projects");
      const json = await res.json();
      setProjects(json.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsProjectsLoading(false);
    }
  };

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/fetch-projects/${selectedProjectId}`);
      const json = await res.json();
      setProject(json.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsProjectLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchProject();
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
