"use client";
import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useParams } from "next/navigation";

type FormValues = {
  title: string;
  description: string;
  category: string;
  projectId: string;
};

const CreateGoal = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("http://localhost:3000/api/create-goal/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          isDone: false,
          projectId: projectId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Goal created successfully!", {
          style: {
            background: "black",
            color: "white",
          },
        });
        console.log("Goal created:", result);
        reset();
        window.location.reload();
      } else {
        toast.error(`Failed to create goal: ${result.message}`, {
          style: {
            background: "black",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("Something went wrong. Please try again.", {
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
      <div>
        <Input
          placeholder="Goal Title"
          {...register("title", { required: "Title is required" })}
          className="text-white placeholder:text-white"
        />
        {errors.title && (
          <p className="text-red-500 text-sm m-2">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Goal Description"
          className="text-white placeholder:text-white"
          {...register("description")}
        />
      </div>

      <div>
        <Input
          placeholder="Goal Category"
          {...register("category", { required: "Category is required" })}
          className="text-white placeholder:text-white"
        />
        {errors.category && (
          <p className="text-red-500 text-sm m-2">{errors.category.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="ml-auto bg-accent font-semibold rounded-[8px] transition-all duration-100 dark:bg-white dark:text-black hover:opacity-80 float-right"
      >
        Create Goal
      </Button>
    </form>
  );
};

export default CreateGoal;
