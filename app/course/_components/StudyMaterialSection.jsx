import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import axios from "axios";

function StudyMaterialSection({ courseId }) {
  const [studyMaterial, setStudyMaterial] = useState();
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
      path: "/flashcard",
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
    setStudyMaterial(result?.data);
  };

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-2">Study Material</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {MaterialList.map((item, index) => (
          <MaterialCardItem
            key={index}
            item={item}
            studyMaterial={studyMaterial}
          />
        ))}
      </div>
    </div>
  );
}

export default StudyMaterialSection;
