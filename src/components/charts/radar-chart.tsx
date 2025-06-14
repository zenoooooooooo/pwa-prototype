"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IProject } from "@/interfaces/IProject";
import { IGoal } from "@/interfaces/IGoal";

export type ProjectWithGoals = IProject & {
  goals: IGoal[];
};

type Props = {
  project: ProjectWithGoals | null;
  isLoading: boolean;
};

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#5E7FA2",
  },
} satisfies ChartConfig;

export function ChartRadarDots({ project, isLoading }: Props) {
  const categoryMap: Record<string, { total: number; completed: number }> = {};

  project?.goals.forEach((goal) => {
    if (!categoryMap[goal.category]) {
      categoryMap[goal.category] = { total: 0, completed: 0 };
    }
    categoryMap[goal.category].total += 1;
    if (goal.isDone) {
      categoryMap[goal.category].completed += 1;
    }
  });

  const chartData = Object.entries(categoryMap).map(
    ([category, { total, completed }]) => ({
      category,
      progress: total === 0 ? 0 : completed / total,
    })
  );

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Project Goal Progress</CardTitle>
        <CardDescription className="text-card-foreground">
          {isLoading ? "Loading..." : "Completed goals per category"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar
              dataKey="progress"
              fill="var(--color-completed)"
              fillOpacity={0.6}
              dot={{ r: 4, fillOpacity: 1 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Progress overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-card-foreground flex items-center gap-2 leading-none">
          Project: {project?.title}
        </div>
      </CardFooter>
    </Card>
  );
}
