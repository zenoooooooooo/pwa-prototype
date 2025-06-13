import { Button } from "@/components/ui/button";
import { ChartPieLabel } from "@/components/charts/pie-chart";
import { ChartAreaGradient } from "@/components/charts/area-chart";
import { ChartRadarDots } from "@/components/charts/radar-chart";
import { Projects } from "@/components/projects-table";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 px-4 py-8 items-stretch">
      <ChartRadarDots />
      <ChartAreaGradient />
      <ChartPieLabel />
      <Projects />
    </div>
  );
}
