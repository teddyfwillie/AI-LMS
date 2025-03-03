import React from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideBar from "./_components/SideBar";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:fixed md:w-64 hidden md:block">
        <SideBar />
      </div>

      <div className="md:ml-64">
        <DashboardHeader />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
