"use client";
import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { toast } from "sonner";

const CreateGoal = () => {
  type FormValues = {
    title: string;
    description: string;
    category: string;

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("http://localhost:3000/api/create-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Project created successfully:", result);
        toast.error("Registration failed!", {
          description: "An error occurred. Please try again.",
          style: {
            background: "black",
            color: "white",
          },
        });
        reset();
      } else {
        console.error("Failed to create project:", result.message);
      }
    } catch (error) {
      console.error("Error posting project:", error);
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
          {...register("title", { required: "Title is required" })}
          className="text-white placeholder:text-white"
        />
        {errors.title && (
          <p className="text-red-500 text-sm m-2">{errors.title.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="ml-auto
      bg-accent font-semibold rounded-[8px] transition-all duration-100
      dark:bg-white dark:text-black hover:opacity-80 float-right"
      >
        Create Project
      </Button>
    </form>
  );
};

export default CreateGoal;
