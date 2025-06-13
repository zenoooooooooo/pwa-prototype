import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomColor() {
  const palette = ["blue", "red", "yellow", "teal", "purple"];
  const pick = palette[Math.floor(Math.random() * palette.length)];

  let r, g, b;

  if (pick === "blue") {
    r = Math.floor(Math.random() * 30);
    g = Math.floor(Math.random() * 80) + 50;
    b = Math.floor(Math.random() * 105) + 150;
  } else if (pick === "red") {
    r = Math.floor(Math.random() * 85) + 170;
    g = Math.floor(Math.random() * 100) + 50;
    b = Math.floor(Math.random() * 30);
  } else if (pick === "yellow") {
    r = Math.floor(Math.random() * 55) + 200;
    g = Math.floor(Math.random() * 55) + 200;
    b = Math.floor(Math.random() * 50);
  } else if (pick === "teal") {
    r = Math.floor(Math.random() * 30);
    g = Math.floor(Math.random() * 110) + 100;
    b = Math.floor(Math.random() * 70) + 130;
  } else if (pick === "purple") {
    r = Math.floor(Math.random() * 70) + 60;
    g = Math.floor(Math.random() * 50);
    b = Math.floor(Math.random() * 105) + 130;
  }

  return `rgb(${r}, ${g}, ${b})`;
}
