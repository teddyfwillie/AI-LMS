import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function DashboardHeader() {
  return (
    <div className="flex justify-between p-5 shadow-md dark:bg-gray-800 dark:text-white dark:shadow-gray-700">
      <div className="flex gap-2 items-center animate-fade-in">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={28}
          height={28}
          className="animate-spin-slow"
        />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          AI LMS
        </h2>
      </div>
      <div className="flex gap-4 items-center animate-fade-in">
        <ModeToggle className="text-gray-800 dark:text-white" />
        <UserButton className="text-gray-800 dark:text-white" />
      </div>
    </div>
  );
}

export default DashboardHeader;
