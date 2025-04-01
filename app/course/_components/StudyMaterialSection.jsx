import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import axios from "axios";
import Link from "next/link";

function StudyMaterialSection({ courseId, course }) {
  const [studyTypeContent, setStudyTypeContent] = useState();
  const MaterialList = [
    {
      name: "Notes/Chapters",
      desc: "Read Note to Prepare it",
      icon: "/notes.png",
      path: "/notes",
      type: "note",
    },
    {
      name: "Flashcard",
      desc: "Create Flashcards to remember important points",
      icon: "/flashcard.png",
      path: "/flashcards",
      type: "flashcard",
    },
    {
      name: "Quiz",
      desc: "Create Quiz to test your knowledge",
      icon: "/quiz.png",
      path: "/quiz",
      type: "quiz",
    },
    {
      name: "Questions/Answers",
      desc: "Create Questions to test your knowledge",
      icon: "/exam.png",
      path: "/assignment",
      type: "qa",
    },
  ];

  useEffect(() => {
    GetStudyMaterial();
  }, []);

  const GetStudyMaterial = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "ALL",
    });
    console.log(result?.data);
    setStudyTypeContent(result?.data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MaterialList.map((item, index) => (
          <MaterialCardItem
            key={index}
            item={item}
            className="hover:scale-[1.02] transition-transform"
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={GetStudyMaterial}
          />
        ))}
      </div>
    </div>
  );
}

export default StudyMaterialSection;
