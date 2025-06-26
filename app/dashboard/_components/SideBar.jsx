"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Shield, BookOpen, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import { CourseCountContext } from "@/app/_contex/CourseCountContex";
import { useUser } from "@clerk/nextjs";

function SideBar() {
  const path = usePathname();
  const { courseCount } = useContext(CourseCountContext);
  const [isMobile, setIsMobile] = React.useState(false);
  const [userCredits, setUserCredits] = useState(5);
  const [maxCredits, setMaxCredits] = useState(5);
  const [isMember, setIsMember] = useState(false);
  const { user } = useUser();

  // Check if we're on mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch user data including credits and membership status
  useEffect(() => {
    async function fetchUserData() {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const response = await fetch('/api/user-details?email=' + user.primaryEmailAddress.emailAddress);
          const userData = await response.json();
          
          if (userData.user) {
            setIsMember(userData.user.isMember || false);
            setUserCredits(userData.user.credit || 5);
            setMaxCredits(userData.user.isMember ? 20 : 5);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }
    
    fetchUserData();
  }, [user]);

  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "My Courses",
      icon: BookOpen,
      path: "/dashboard/course",
    },
    {
      name: "Create Course",
      icon: PlusCircle,
      path: "/dashboard/create",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  return (
    <div className="h-screen shadow-md p-3 sm:p-4 md:p-5 dark:bg-gray-900 dark:text-gray-100 dark:border-r dark:border-gray-700 flex flex-col bg-white">
      {/* Logo Section - Hide on mobile as it's shown in header */}
      <div className="hidden md:flex gap-2 items-center animate-fade-in">
        <Link
          href="/dashboard"
          aria-label="home"
          className="flex items-center space-x-2"
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={65}
            height={65}
            className="animate-spin-slow"
            priority
          />
        </Link>
      </div>

      {/* Create New Button */}
      <div className="mt-5 md:mt-10">
        <Link href={"/dashboard/create"} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 animate-fade-in cursor-pointer text-sm sm:text-base">
            {isMobile ? "+ New" : "+ Create New"}
          </Button>
        </Link>
      </div>

      {/* Menu List */}
      <div className="mt-4 md:mt-5 flex-1">
        {MenuList.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              className={`flex gap-3 sm:gap-4 md:gap-5 items-center p-2 sm:p-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer rounded-md mt-2 sm:mt-3 transition-all duration-300 ${
                path === item.path
                  ? "bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <item.icon
                className={`w-5 h-5 flex-shrink-0 ${
                  path === item.path
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <h2 className="text-sm sm:text-md font-medium truncate">
                {isMobile ? item.name.split(" ")[0] : item.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Credits Section */}
      <div className="border p-2 sm:p-3 rounded-lg bg-slate-100 dark:bg-gray-800 dark:text-gray-100 animate-fade-in-up mt-4 text-center sm:text-left">
        <h2 className="text-base sm:text-lg mb-1 sm:mb-2 text-gray-800 dark:text-gray-100">
          Credits: {userCredits - courseCount}
        </h2>
        <Progress
          value={(courseCount / maxCredits) * 100}
          className="h-2 bg-gray-300 dark:bg-gray-700"
        />
        <h2 className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
          {courseCount}/{maxCredits} Used
        </h2>
        {!isMember && (
          <Link
            href="/dashboard/upgrade"
            className="text-blue-500 text-xs sm:text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 inline-block mt-1"
          >
            {isMobile ? "Upgrade" : "Upgrade to create more"}
          </Link>
        )}
      </div>
    </div>
  );
}

export default SideBar;
