"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../../_components/StepProgress";
import QuizCardItem from "./_components/QuizCardItem";

function Page() {
  const { courseId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [stepCount, setStepCount] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [correctAns, setCorrectAnswer] = useState(null);
  const [iscorrectAns, setIsCorrectAnswer] = useState(null);

  useEffect(() => {
    GetQuiz();
  }, [courseId]);

  const GetQuiz = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "Quiz",
      });

      setQuizData(result.data);
      setQuiz(
        Array.isArray(result.data?.content?.questions)
          ? result.data?.content?.questions
          : []
      );
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const checkAnswer = (userAnswer, currentQuestion) => {
    const isCorrect = userAnswer === currentQuestion?.correctAnswer;
    setCorrectAnswer(isCorrect);
    setIsCorrectAnswer(currentQuestion?.correctAnswer);
  };

  useEffect(() => {
    setCorrectAnswer(null);
    setIsCorrectAnswer(null);
  }, [stepCount]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Quiz</h2>

      <StepProgress
        data={quiz}
        stepCount={stepCount}
        setStepCount={setStepCount}
      />

      <div className="mt-10">
        {quiz.length > 0 ? (
          <QuizCardItem
            quiz={quiz[stepCount]}
            userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
          />
        ) : (
          <p className="text-center text-gray-500">No questions available.</p>
        )}
      </div>

      {/* Feedback Message */}
      {correctAns === false && (
        <div className="border p-3 border-red-700 bg-red-200 rounded-lg mt-5">
          <h2 className="font-bold text-lg text-red-600">Incorrect</h2>
          <p className="text-red-600">Correct Answer: {iscorrectAns}</p>
        </div>
      )}
      {correctAns === true && (
        <div className="border p-3 border-green-700 bg-green-200 rounded-lg mt-5">
          <h2 className="font-bold text-lg text-green-600">Correct</h2>
          <p className="text-green-600">Your Answer Is Correct</p>
        </div>
      )}
    </div>
  );
}

export default Page;
