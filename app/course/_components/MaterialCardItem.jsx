import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);

  const GenerateContent = async () => {
    toast("Generating content...");
    setLoading(true);

    try {
      const chapters = course?.courseLayout?.chapters
        .map((chapter) => chapter?.chapter_title || chapter?.chapterTitle)
        .join(",");

      const result = await axios.post("/api/study-type-content", {
        courseId: course?.courseId,
        type: item?.name,
        Chapter: chapters, // Ensure consistency with API
      });

      console.log("Response:", result.data);
      toast.success("Content generated successfully");
      refreshData(true);
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/course/${course?.courseId}${item.path}`}>
      <div
        className={`rounded-lg p-5 border shadow-md flex items-center flex-col ${
          !studyTypeContent?.[item?.name]?.length && "grayscale"
        }`}
      >
        <h2
          className={`text-sm font-bold p-1 rounded-full px-2 mb-2 ${
            studyTypeContent?.[item?.name]?.length
              ? "text-green-500 bg-green-100"
              : "text-gray-500 bg-red-100"
          }`}
        >
          {studyTypeContent?.[item?.name]?.length ? "Ready" : "Not Ready"}
        </h2>

        <Image src={item.icon} alt={item.name} width={70} height={70} />
        <h2 className="text-lg font-bold mt-2">{item.name}</h2>
        <p className="text-gray-500 mt-1 text-sm text-center">{item.desc}</p>

        {!studyTypeContent?.[item?.name]?.length ? (
          <Button
            variant="default"
            className="mt-2 w-full"
            onClick={GenerateContent}
            disabled={loading}
          >
            {loading ? <RefreshCw className="animate-spin" /> : "Generate"}
          </Button>
        ) : (
          <Button variant="outline" className="mt-2 w-full">
            View
          </Button>
        )}
      </div>
    </Link>
  );
}

export default MaterialCardItem;
