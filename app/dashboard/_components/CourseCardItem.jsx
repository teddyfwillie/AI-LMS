import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import React from "react";

function CourseCardItem({ course }) {
  return (
    <div className=" border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div>
        <div className="flex items-center justify-between ">
          <Image
            src={"/knowledge.png"}
            alt="knowledge"
            width={50}
            height={50}
          />
          <h2 className="text-[10px] p-1 rounded-full px-2 bg-blue-600 text-white ">
            20 Dec 2024
          </h2>
        </div>
        <h2 className="mt-3">{course?.courseLayout?.course_title}</h2>
        <p className="text-xs line-clamp-2">
          {course?.courseLayout?.course_summary}
        </p>
        <p className="text-xs">{course?.courseLayout?.course_summary}</p>
        <div className="mt-3">
          <Progress value={0} />
        </div>
        <div className="mt-3 flex justify-end">
          {course?.status === "Generating" ? (
            <h2 className="text-sm p-1 rounded-full px-2 bg-blue-600 text-white flex items-center gap-2 ">
              {" "}
              <RefreshCw className="animate-spin h-4 w-4" />
              Generating...
            </h2>
          ) : (
            <Button>View Course</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;
