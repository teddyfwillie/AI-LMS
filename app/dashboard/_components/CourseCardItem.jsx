import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CourseCardItem({ course }) {
  // Format creation date
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!course?.progress) return 0;
    return Math.round(
      (course.progress.completedLessons / course.progress.totalLessons) * 100
    );
  };

  return (
    <div className="group border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="relative w-12 h-12">
            <Image
              src={course?.image || "/knowledge.png"}
              alt={course?.courseLayout?.course_title || "Course image"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50px, 75px"
            />
          </div>
          <span className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-full">
            {course?.createdAt ? formatDate(course.createdAt) : "Draft"}
          </span>
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <h2 className="font-medium text-lg line-clamp-2 mb-2">
            {course?.courseLayout?.course_title || "Untitled Course"}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {course?.courseLayout?.course_summary || "No description available"}
          </p>
        </div>

        {/* Progress Section */}
        {course?.status === "completed" && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{calculateProgress()}%</span>
            </div>
            <Progress value={calculateProgress()} />
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-4 flex justify-end">
          {course?.status === "generating" ? (
            <div className="flex items-center gap-2 text-sm text-primary">
              <RefreshCw className="animate-spin h-4 w-4" />
              Generating...
            </div>
          ) : (
            <Link
              href={`/course/${course?.courseId}`}
              className="transition-opacity hover:opacity-80 "
            >
              <Button
                size="sm"
                aria-label={`View ${course?.courseLayout?.course_title}`}
                className="cursor-pointer"
              >
                {course?.status === "completed" ? "Continue" : "View Course"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;
