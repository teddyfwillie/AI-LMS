import { Progress } from "@/components/ui/progress";
import React from "react";
import { BookOpenIcon, ArchiveIcon } from "lucide-react";

function CourseIntroCard({ course }) {
  return (
    <div className="flex flex-col gap-6 p-8 border border-gray-200 shadow-lg rounded-xl bg-white hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpenIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            {course?.courseLayout?.course_title}
          </h1>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed">
          {course?.courseLayout?.course_summary}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-blue-600">Course Progress</span>
            <span className="text-gray-500">25% Complete</span>
          </div>
          <Progress className="h-3 bg-gray-100" value={25} />
        </div>

        <div className="flex items-center gap-2 text-blue-600 font-medium">
          <ArchiveIcon className="w-5 h-5" />
          <span>{course?.courseLayout?.chapters?.length} Chapters</span>
        </div>
      </div>
    </div>
  );
}

export default CourseIntroCard;
