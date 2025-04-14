// CourseViewLayout.tsx
import React from "react";
import DashboardHeader from "../dashboard/_components/DashboardHeader";

function CourseViewLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b  from-gray-50 to-white">
      <DashboardHeader />
      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="space-y-8 animate-fade-in">{children}</div>
      </main>
    </div>
  );
}

export default CourseViewLayout;
