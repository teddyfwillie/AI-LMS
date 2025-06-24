"use client";

import React, { useState } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideBar from "./_components/SideBar";
import { CourseCountContext } from "../_contex/CourseCountContex";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

function DashboardLayout({ children }) {
  const [courseCount, setCourseCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Set sidebar to open by default on larger screens
  React.useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <CourseCountContext.Provider value={{ courseCount, setCourseCount }}>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity md:hidden" 
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
        
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:relative md:shadow-md`}
        >
          <SideBar />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 w-full overflow-x-hidden transition-all duration-300">
          <DashboardHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          
          {/* Mobile sidebar toggle button - only visible when sidebar is closed */}
          <div className={`md:hidden fixed bottom-4 right-4 z-40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Button 
              onClick={toggleSidebar} 
              variant="outline" 
              size="icon"
              className="rounded-full h-12 w-12 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
              aria-label="Open sidebar"
            >
              <Menu />
            </Button>
          </div>
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 transition-all duration-300">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </CourseCountContext.Provider>
  );
}

export default DashboardLayout;
