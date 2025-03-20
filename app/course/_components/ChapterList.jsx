import React from "react";

function ChapterList({ course }) {
  const CHAPTER = course?.courseLayout?.chapters;
  return (
    <>
      <h2 className="text-lg font-bold mb-2">Chapters</h2>
      {CHAPTER?.map((chapter, index) => (
        <div
          key={index}
          className="border shadow-md rounded-lg p-5 mb-2 flex items-center gap-5 w-full hover:cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-2">{chapter?.title}</h2>
          <div key={chapter?.id}>
            <h2 className="font-medium">{chapter?.chapter_title}</h2>
            <p className="text-gray-500 mt-1 text-sm">
              {chapter?.chapter_summary}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChapterList;
