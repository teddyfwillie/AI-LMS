import React from "react";
import { ChevronRightIcon, ClockIcon } from "lucide-react";

function ChapterList({ course }) {
  const CHAPTER = course?.courseLayout?.chapters;
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Chapters</h2>
      <div className="space-y-4">
        {CHAPTER?.map((chapter, index) => (
          <div
            key={index}
            className="group border border-gray-200 rounded-xl p-6 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3">
                <span className="text-xl font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {chapter?.chapter_title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {chapter?.chapter_summary}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                  <ClockIcon className="w-4 h-4" />
                  <span>Estimated time: 45 mins</span>
                </div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-600 ml-4" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChapterList;
