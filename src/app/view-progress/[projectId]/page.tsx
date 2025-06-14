"use client";
import { ProjectWithGoals } from "@/interfaces/ProjectWithGoals";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import CreateGoal from "@/components/create-goal-form";
import { AnimatePresence, motion } from "framer-motion";
import { ChartRadarDots } from "@/components/charts/radar-chart";
import { ChartAreaGradient } from "@/components/charts/area-chart";
import { ChartPieLabel } from "@/components/charts/pie-chart";

const ViewProgress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
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
      </div>
      <div className="lg:grid-cols-3 md:grid-cols-2 gap-4">
        <Card
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer hover:bg-muted/50 transition"
        >
          <div className="flex h-full items-center justify-center p-6">
            <Plus className="w-10 h-10 text-muted-foreground" />
          </div>
        </Card>
        {project?.goals.map((goal: any) => (
          <Card key={goal._id}>
            <CardHeader>
              <CardTitle className="text-lg">{goal.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {goal.description}
              </p>
              <p className="mt-4 font-medium">
                Status: 
                <span
                  className={`font-semibold ${
                    goal.isCompleted ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {goal.isCompleted ? "Completed" : "In Progress"}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md rounded-lg bg-zinc-900 p-6 shadow-lg"
            >
              <div className="mb-5 flex w-full items-center justify-between">
                <p className="text-xl font-semibold text-white">Create Goal</p>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-600/40 outline-none transition-all duration-200 ease-in-out hover:bg-zinc-600/30"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </button>
              </div>

              <CreateGoal />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ViewProgress;
