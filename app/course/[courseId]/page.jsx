"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseIntroCard from "../_components/CourseIntroCard";
import StudyMaterialSection from "../_components/StudyMaterialSection";
import ChapterList from "../_components/ChapterList";
function page() {
  const { courseId } = useParams();

  const [course, setCourse] = useState();

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await axios.get(`/api/courses?courseId=${courseId}`);
    console.log(result.data.result);
    setCourse(result.data.result);
  };

  return (
    <div className="container mx-auto">
      <div className="mx-10 md:mx-36 lg:mx-44 mt-10 animate-fade-in">
        {/* Course Details */}
        <CourseIntroCard course={course} />

        {/* Study Material Options */}
        <StudyMaterialSection courseId={courseId} course={course} />

        {/* Study Material List */}
        <ChapterList course={course} />
      </div>
    </div>
  );
}

export default page;
