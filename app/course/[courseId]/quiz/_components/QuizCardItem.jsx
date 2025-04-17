import React, { useState } from "react";

function QuizCardItem({ quiz, userSelectedOption }) {
  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-6 md:mt-10 p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/50 transition-all">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-center text-gray-800 dark:text-gray-100 mb-6 md:mb-8">
        {quiz?.questionText}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-5">
        {quiz?.options?.map((option, index) => (
          <button
            onClick={() => {
              setSelectedOption(option);
              userSelectedOption(option);
            }}
            key={index}
            className={`
              w-full border rounded-full p-3 md:p-4 text-center text-base md:text-lg 
              hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              ${
                selectedOption === option
                  ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 border-transparent"
                  : "border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizCardItem;
