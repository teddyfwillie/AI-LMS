"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Shield, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { CourseCountContext } from "@/app/_contex/CourseCountContex";

function SideBar() {
  const path = usePathname();
  const { courseCount } = useContext(CourseCountContext);

  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="h-screen shadow-md p-5 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="flex gap-2 items-center animate-fade-in">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={28}
          height={28}
          className="animate-spin-slow"
        />
        <h2 className="text-lg font-semibold text-gray-800">AI LMS</h2>
      </div>

      {/* Create New Button */}
      <div className="mt-10">
        <Link href={"/create"} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 animate-fade-in cursor-pointer">
            + Create New
          </Button>
        </Link>
      </div>

      {/* Menu List */}
      <div className="mt-5 flex-1">
        {MenuList.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              className={`flex gap-5 items-center p-3 hover:bg-blue-50 cursor-pointer rounded-md mt-3 transition-all duration-300 ${
                path === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  path === item.path ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <h2 className="text-md font-medium">{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Credits Section */}
      <div className="border p-3 rounded-lg bg-slate-100 animate-fade-in-up">
        <h2 className="text-lg mb-2 text-gray-800">
          Available Credits: {5 - courseCount}
        </h2>
        <Progress value={(courseCount / 5) * 100} className="h-2 bg-gray-300" />
        <h2 className="text-sm text-gray-600 mt-1">
          {courseCount} out of 5 Credits Used
        </h2>
        <Link
          href="/dashboard/upgrade"
          className="text-blue-500 text-sm hover:text-blue-600 transition-colors duration-300"
        >
          Upgrade to create more
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
