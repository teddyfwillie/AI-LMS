import React from "react";
import { ChevronRightIcon, ClockIcon } from "lucide-react";

function ChapterList({ course }) {
  const CHAPTER = course?.courseLayout?.chapters;
  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Course Chapters</h2>
      <div className="space-y-3 sm:space-y-4">
        {CHAPTER?.map((chapter, index) => (
          <div
            key={index}
            className="group border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg p-2 sm:p-3 flex-shrink-0">
                <span className="text-base sm:text-lg md:text-xl font-bold">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0"> {/* min-width-0 helps with text truncation */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {chapter?.chapter_title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {chapter?.chapter_summary}
                </p>
                <div className="mt-2 sm:mt-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                  <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">Estimated time: 45 mins</span>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 ml-2 sm:ml-4 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChapterList;
