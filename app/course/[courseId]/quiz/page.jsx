"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, Info, Trophy } from "lucide-react";
import QuizCardItem from "./_components/QuizCardItem";

function QuizPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [quizData, setQuizData] = useState(null);
  const [stepCount, setStepCount] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [correctAns, setCorrectAnswer] = useState(null);
  const [iscorrectAns, setIsCorrectAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    getQuiz();
  }, [courseId]);

  const getQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "Quiz",
      });

      setQuizData(result.data);
      const questions = Array.isArray(result.data?.content?.questions)
        ? result.data?.content?.questions
        : [];
      setQuiz(questions);
      setUserAnswers(new Array(questions.length).fill(null));
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError("Failed to load quiz. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (userAnswer, currentQuestion) => {
    const isCorrect = userAnswer === currentQuestion?.correctAnswer;
    setCorrectAnswer(isCorrect);
    setIsCorrectAnswer(currentQuestion?.correctAnswer);
    
    // Store user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[stepCount] = userAnswer;
    setUserAnswers(newUserAnswers);
  };

  const handleBackToCourse = () => {
    router.push(`/course/${courseId}`);
  };

  const handleNextQuestion = () => {
    if (stepCount < quiz.length - 1) {
      setStepCount(stepCount + 1);
      setCorrectAnswer(null);
      setIsCorrectAnswer(null);
    } else {
      // Calculate final score
      const correctCount = userAnswers.reduce((count, answer, index) => {
        return count + (answer === quiz[index]?.correctAnswer ? 1 : 0);
      }, 0);
      
      setScore({
        correct: correctCount,
        total: quiz.length
      });
      
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (stepCount > 0) {
      setStepCount(stepCount - 1);
      setCorrectAnswer(null);
      setIsCorrectAnswer(null);
    }
  };

  const handleRestartQuiz = () => {
    setStepCount(0);
    setCorrectAnswer(null);
    setIsCorrectAnswer(null);
    setQuizCompleted(false);
    setUserAnswers(new Array(quiz.length).fill(null));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
          <div className="text-red-500 mb-4">
            <Info size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button onClick={handleBackToCourse}>Return to Course</Button>
        </div>
      </div>
    );
  }

  if (!quiz || quiz.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center bg-amber-50 p-6 rounded-lg max-w-md">
          <div className="text-amber-500 mb-4">
            <Info size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-amber-700 mb-2">No Quiz Available</h2>
          <p className="text-gray-700 mb-4">There are no quiz questions available for this course yet.</p>
          <Button onClick={handleBackToCourse}>Return to Course</Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score.correct / score.total) * 100);
    const isPassing = percentage >= 70;
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToCourse}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Quiz Results</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mb-6">
            <Trophy className={`w-16 h-16 mx-auto ${isPassing ? 'text-yellow-500' : 'text-gray-400'}`} />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {isPassing ? 'Congratulations!' : 'Quiz Completed'}
          </h2>
          
          <div className="text-5xl font-bold my-6">
            <span className={isPassing ? 'text-green-600' : 'text-amber-600'}>{percentage}%</span>
          </div>
          
          <p className="text-xl mb-2">
            You scored <span className="font-bold">{score.correct}</span> out of <span className="font-bold">{score.total}</span>
          </p>
          
          <p className="text-gray-600 mb-8">
            {isPassing 
              ? 'Great job! You have successfully completed this quiz.' 
              : 'Keep studying and try again to improve your score.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleRestartQuiz} variant="outline">
              Restart Quiz
            </Button>
            <Button onClick={handleBackToCourse}>
              Return to Course
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBackToCourse}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Quiz</h1>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {stepCount + 1} of {quiz.length}</span>
          <span>{Math.round(((stepCount + 1) / quiz.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${((stepCount + 1) / quiz.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <QuizCardItem
          quiz={quiz[stepCount]}
          userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
          selectedOption={userAnswers[stepCount]}
        />
      </div>

      {/* Feedback Message */}
      {correctAns !== null && (
        <div className={`p-4 rounded-lg mb-6 ${correctAns ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {correctAns ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div className="ml-3">
              <h3 className={`text-lg font-medium ${correctAns ? 'text-green-800' : 'text-red-800'}`}>
                {correctAns ? 'Correct!' : 'Incorrect'}
              </h3>
              <div className={`mt-2 text-sm ${correctAns ? 'text-green-700' : 'text-red-700'}`}>
                {correctAns ? (
                  <p>Great job! You selected the correct answer.</p>
                ) : (
                  <div>
                    <p>The correct answer is:</p>
                    <p className="font-medium mt-1">{iscorrectAns}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={stepCount === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNextQuestion}
          disabled={userAnswers[stepCount] === null}
        >
          {stepCount < quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </div>
    </div>
  );
}

export default QuizPage;
