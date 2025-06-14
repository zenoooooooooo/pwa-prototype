"use client";

import { ChartAreaGradient } from "@/components/charts/area-chart";
import { ChartPieLabel } from "@/components/charts/pie-chart";
import { ChartRadarDots } from "@/components/charts/radar-chart";
import { ProjectWithGoals } from "@/interfaces/ProjectWithGoals";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ViewProgress = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectWithGoals | null>(null);
  const [isProjectLoading, setIsProjectLoading] = useState(true);

  const fetchProjectAndGoals = async () => {
    if (!projectId) return;

    try {
      const res = await fetch(`/api/fetch-projects/${projectId}`);
      const projectJson = await res.json();

      const goalsRes = await fetch(`/api/fetch-goals/${projectId}`);
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

  useEffect(() => {
    fetchProjectAndGoals();
  }, []);

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3 px-4 py-8 items-stretch">
      <ChartRadarDots project={project} isLoading={isProjectLoading} />
      <div className="flex justify-center items-center">
        Upgrade to see summarization by AI
      </div>
      <ChartAreaGradient project={project} isLoading={isProjectLoading} />
      <div className="flex justify-center items-center">
        Upgrade to see summarization by AI
      </div>
      <ChartPieLabel project={project} isLoading={isProjectLoading} />
      <div className="flex justify-center items-center">
        Upgrade to see summarization by AI
      </div>
      <div></div>
    </div>
  );
};

export default ViewProgress;
