import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DashboardHeader({ toggleSidebar, sidebarOpen }) {
  return (
    <header className="flex justify-between items-center p-3 sm:p-4 md:p-5 shadow-md dark:text-white dark:shadow-gray-700 sticky top-0 z-10 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <div className="flex gap-2 sm:gap-4 items-center animate-fade-in">
        <ModeToggle className="text-gray-800 dark:text-white" />
        <UserButton className="text-gray-800 dark:text-white" />
      </div>
    </header>
  );
}

export default DashboardHeader;
