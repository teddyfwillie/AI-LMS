import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DashboardHeader() {
  return (
    <div className="flex justify-between p-5 shadow-md dark:bg-gray-800 dark:text-white dark:shadow-gray-700">
      <Link href="/dashboard">
        <div className="flex gap-2 items-center animate-fade-in">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={65}
            height={65}
            className="animate-spin-slow"
          />
        </div>
      </Link>
      <div className="flex gap-4 items-center animate-fade-in">
        <ModeToggle className="text-gray-800 dark:text-white" />
        <UserButton className="text-gray-800 dark:text-white" />
      </div>
    </div>
  );
}

export default DashboardHeader;
