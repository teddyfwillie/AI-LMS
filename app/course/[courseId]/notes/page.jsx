"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]); // Initialize as an empty array
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "note",
      });
      console.log(result?.data);
      setNotes(result?.data || []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  if (!notes) {
    return <p className="text-center text-gray-500">No notes available.</p>;
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="flex gap-5 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount((prev) => prev - 1)}
          disabled={stepCount === 0} // Disable if at first step
        >
          Previous
        </Button>

        {notes.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index <= stepCount ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount((prev) => prev + 1)}
          disabled={stepCount >= notes.length - 1} // Disable if at last step
        >
          Next
        </Button>
      </div>

      {/* Notes Display */}
      <div className="mt-10">
        <div
          dangerouslySetInnerHTML={{
            __html: notes[stepCount]?.note
              ?.replace("```html", "")
              .replace("```", ""),
          }}
        />
      </div>

      {/* End of Notes Message */}
      {stepCount >= notes.length - 1 && (
        <div className="flex items-center gap-5 flex-col justify-center mt-5">
          <h1 className="text-lg font-bold">End of Notes</h1>
          <Button onClick={() => router.back()}>Go to Course Page</Button>
        </div>
      )}
    </div>
  );
}

export default ViewNotes;
