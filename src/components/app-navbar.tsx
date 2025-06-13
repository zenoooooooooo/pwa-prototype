"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import React, { useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";

const NavBar = () => {
  const [name, setName] = useState("John Doe");

  return (
    <nav className="p4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Link href="/">Dashboard</Link>
        <h1>Hello {name}</h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default NavBar;
