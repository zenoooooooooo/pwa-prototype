"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";
import { getRandomColor } from "@/lib/utils";

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
import { ProjectWithGoals } from "@/interfaces/ProjectWithGoals";

type Props = {
  project: ProjectWithGoals | null;
  isLoading: boolean | string;
};

const chartConfig = {
  goals: {
    label: "Goals",
  },
} satisfies ChartConfig;

export function ChartPieLabel({ project, isLoading }: Props) {
  const categoryMap: Record<string, number> = {};
  project?.goals.forEach((goal) => {
    categoryMap[goal.category] = (categoryMap[goal.category] || 0) + 1;
  });

  const chartData = Object.entries(categoryMap).map(([category, count]) => ({
    category,
    count,
    fill: getRandomColor(),
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Categories</CardTitle>

        <CardDescription className="text-card-foreground">
          {!project
            ? "Select a project to see graph..."
            : isLoading
            ? "Loading..."
            : "Distribution by category"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-card-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              label
              outerRadius="80%"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Progress Overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-card-foreground leading-none">
          Project: {project?.title}
        </div>
      </CardFooter>
    </Card>
  );
}
