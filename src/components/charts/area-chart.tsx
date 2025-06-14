"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { getRandomColor } from "@/lib/utils";
import { ProjectWithGoals } from "@/interfaces/ProjectWithGoals";

type Props = {
  project: ProjectWithGoals | null;
  isLoading: boolean | string;
};

const chartConfig = {
  completed: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaGradient({ project, isLoading }: Props) {
  const completedColor = useMemo(() => getRandomColor(), []);
  const pendingColor = useMemo(() => getRandomColor(), []);

  const categoryMap: Record<string, { completed: number; pending: number }> =
    {};

  project?.goals.forEach((goal) => {
    if (!categoryMap[goal.category]) {
      categoryMap[goal.category] = { completed: 0, pending: 0 };
    }
    if (goal.isDone) {
      categoryMap[goal.category].completed += 1;
    } else {
      categoryMap[goal.category].pending += 1;
    }
  });

  const chartData = Object.entries(categoryMap).map(
    ([category, { completed, pending }]) => ({
      category,
      completed,
      pending,
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Project Goals</CardTitle>
        <CardDescription className="text-card-foreground">
          {isLoading === "initial"
            ? "Select a project to see graph"
            : isLoading
            ? "Loading..."
            : "Goal completion breakdown per category"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
            width={300}
            height={250}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={completedColor}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={completedColor}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={pendingColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={pendingColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="pending"
              type="natural"
              fill="url(#fillPending)"
              stroke={pendingColor}
              fillOpacity={0.4}
              stackId="a"
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke={completedColor}
              fillOpacity={0.4}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Project overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-card-foreground flex items-center gap-2 leading-none">
          {project?.title}
        </div>
      </CardFooter>
    </Card>
  );
}
