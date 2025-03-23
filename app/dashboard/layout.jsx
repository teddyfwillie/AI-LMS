"use client";

import React, { useState } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideBar from "./_components/SideBar";
import { CourseCountContext } from "../_contex/CourseCountContex";

function DashboardLayout({ children }) {
  const [courseCount, setCourseCount] = useState(0);
  return (
    <CourseCountContext.Provider value={{ courseCount, setCourseCount }}>
      <div>
        <div className="md:fixed md:w-64 hidden md:block">
          <SideBar />
        </div>

        <div className="md:ml-64">
          <DashboardHeader />
          <div className="p-5">{children}</div>
        </div>
      </div>
    </CourseCountContext.Provider>
  );
}

export default DashboardLayout;
