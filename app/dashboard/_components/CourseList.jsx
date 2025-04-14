"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseCardItem from "./CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { CourseCountContext } from "@/app/_contex/CourseCountContex";
import { toast } from "sonner";
import Link from "next/link";

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseCount, setCourseCount } = useContext(CourseCountContext);

  useEffect(() => {
    if (user) {
      GetCourseList();
    }
  }, [user]);

  const GetCourseList = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      if (!result.data?.result) {
        throw new Error("Invalid response structure");
      }

      setCourseList(result.data.result);
      setCourseCount(result.data.result.length);
    } catch (error) {
      setError(error.message);
      toast.error("Failed to load courses: " + error.message);
      console.error("Course fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="mt-10 text-center text-red-500">
        Error loading courses. Please try again.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold flex items-center justify-between text-gray-900 dark:text-white">
        Your Study Material
        <Button
          variant="outline"
          onClick={GetCourseList}
          disabled={loading}
          className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300"
        >
          <RefreshCw className={loading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {loading ? (
          // Skeleton loader
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-40 w-full animate-pulse bg-slate-200 dark:bg-gray-700 rounded-lg"
            />
          ))
        ) : courseList?.length > 0 ? (
          // Course cards
          courseList.map((course) => (
            <CourseCardItem
              key={course.courseId} // Use actual ID instead of index
              course={course}
            />
          ))
        ) : (
          // Empty state
          <div className="col-span-full text-center text-gray-500 dark:text-gray-300 py-8">
            No study materials found. <br />
            <Link href="/create">
              <Button
                variant="outline"
                className="mt-2 dark:border-gray-600 dark:text-gray-300"
              >
                Create a Course
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseList;
