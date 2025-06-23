import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);

  const GenerateContent = async (e) => {
    // Prevent the default link navigation
    e.preventDefault();
    e.stopPropagation();
    
    toast("Generating content...");
    setLoading(true);

    try {
      // Use the courseId from props directly if course object is not fully loaded yet
      const currentCourseId = course?.courseId || studyTypeContent?.courseId;
      
      if (!currentCourseId) {
        console.error("Course data:", course);
        console.error("Study type content:", studyTypeContent);
        throw new Error("Course ID is missing - please try again after the course fully loads");
      }

      if (!item?.name) {
        throw new Error("Study type is missing");
      }

      // Get chapter titles and ensure we have them
      let chapters = "";
      if (course?.courseLayout?.chapters) {
        chapters = course.courseLayout.chapters
          .map((chapter) => chapter?.chapter_title || chapter?.chapterTitle)
          .filter(Boolean)
          .join(",");
      }

      if (!chapters) {
        throw new Error("Chapter information is missing - please wait for course data to load");
      }

      console.log("Sending request with:", {
        courseId: currentCourseId,
        type: item.name,
        Chapter: chapters
      });

      const result = await axios.post("/api/study-type-content", {
        courseId: currentCourseId,
        type: item.name,
        Chapter: chapters,
      });

      console.log("Response:", result.data);
      toast.success("Content generated successfully");
      refreshData(true);
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(error.message || "Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  // Check if content is ready (has length > 0)
  const isContentReady = studyTypeContent?.[item?.type]?.length > 0;
  
  // Determine if we should show the generate button
  const showGenerateButton = !isContentReady;
  
  return (
    <Link href={`/course/${course?.courseId}${item.path}`}>
      <div
        className={`rounded-lg p-5 border shadow-md flex items-center flex-col ${
          !isContentReady && "grayscale"
        }`}
      >
        <h2
          className={`text-sm font-bold p-1 rounded-full px-2 mb-2 ${
            isContentReady
              ? "text-white bg-green-500" // Green background for ready content
              : "text-white bg-black"     // Black background for not ready content
          }`}
        >
          {isContentReady ? "Ready" : "Not Ready"}
        </h2>

        <Image src={item.icon} alt={item.name} width={70} height={70} />
        <h2 className="text-lg font-bold mt-2">{item.name}</h2>
        <p className="text-gray-500 mt-1 text-sm text-center">{item.desc}</p>

        {showGenerateButton ? (
          <Button
            variant="default"
            className="mt-2 w-full cursor-pointer"
            onClick={(e) => GenerateContent(e)}
            disabled={loading}
          >
            {loading ? <RefreshCw className="animate-spin" /> : "Generate"}
          </Button>
        ) : (
          <Button variant="outline" className="mt-2 w-full cursor-pointer">
            View
          </Button>
        )}
      </div>
    </Link>
  );
}

export default MaterialCardItem;
