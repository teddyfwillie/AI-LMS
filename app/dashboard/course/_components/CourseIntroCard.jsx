import { Progress } from "@/components/ui/progress";
import React from "react";
import { BookOpenIcon, ArchiveIcon } from "lucide-react";

function CourseIntroCard({ course }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 p-4 sm:p-6 md:p-8 border border-gray-200 shadow-lg rounded-xl bg-white hover:shadow-xl transition-shadow">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <BookOpenIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 flex-shrink-0" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 line-clamp-2">
            {course?.courseLayout?.course_title}
          </h1>
        </div>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3">
          {course?.courseLayout?.course_summary}
        </p>

        <div className="space-y-1 sm:space-y-2">
          <div className="flex justify-between text-xs sm:text-sm font-medium">
            <span className="text-blue-600">Course Progress</span>
            <span className="text-gray-500">25% Complete</span>
          </div>
          <Progress className="h-2 sm:h-3 bg-gray-100" value={25} />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 text-blue-600 font-medium text-xs sm:text-sm md:text-base">
          <ArchiveIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span>{course?.courseLayout?.chapters?.length} Chapters</span>
        </div>
      </div>
    </div>
  );
}

export default CourseIntroCard;
