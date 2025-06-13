import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-cols-4 p-4">
      <section className="flex flex-col gap-2">
        <Button className="p-6 hover:cursor-pointer text-md bg-[#4CAF50] text-white hover:bg-[#449d48]">
          Create Project
        </Button>
        <Button className="p-6 hover:cursor-pointer text-md bg-[#8E6E53] text-white hover:bg-[#7a5d47]">
          Archive Project
        </Button>
        <Button className="p-6 hover:cursor-pointer text-md bg-[#3BAFDA] text-white hover:bg-[#3496c1]">
          View Progress
        </Button>
      </section>
    </div>
  );
}
