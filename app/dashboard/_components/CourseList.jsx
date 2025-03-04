"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCardItem from "./CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    setLoading(true);
    const result = await axios.post("/api/courses", {
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result.data.result);
    setCourseList(result.data.result);
    setLoading(false);
  };
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold flex items-center justify-between">
        Your Study Material
        <Button variant={"outline"} onClick={GetCourseList}>
          <RefreshCw />
          Refresh
        </Button>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {loading == false
          ? courseList?.map((course, index) => (
              <CourseCardItem course={course} key={index} />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-40 w-full animate-pulse bg-slate-200 rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default CourseList;
