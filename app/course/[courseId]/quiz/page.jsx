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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 md:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Quiz</h2>

        <StepProgress
          data={quiz}
          stepCount={stepCount}
          setStepCount={setStepCount}
        />

        <div className="mt-8 md:mt-10">
          {quiz.length > 0 ? (
            <QuizCardItem
              quiz={quiz[stepCount]}
              userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
            />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No questions available.
            </p>
          )}
        </div>

        {/* Feedback Message */}
        {correctAns === false && (
          <div className="border p-3 border-red-600 dark:border-red-500 bg-red-100 dark:bg-red-900/30 rounded-lg mt-4 md:mt-5 transition-all">
            <h2 className="font-bold text-lg text-red-600 dark:text-red-400">
              Incorrect
            </h2>
            <p className="text-red-600 dark:text-red-400">
              Correct Answer: {iscorrectAns}
            </p>
          </div>
        )}
        {correctAns === true && (
          <div className="border p-3 border-green-600 dark:border-green-500 bg-green-100 dark:bg-green-900/30 rounded-lg mt-4 md:mt-5 transition-all">
            <h2 className="font-bold text-lg text-green-600 dark:text-green-400">
              Correct
            </h2>
            <p className="text-green-600 dark:text-green-400">
              Your Answer Is Correct
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
