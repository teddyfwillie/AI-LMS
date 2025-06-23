import React from "react";

function QuizCardItem({ quiz, userSelectedOption, selectedOption: externalSelectedOption }) {
  // Use the external selectedOption if provided (for when returning to previous questions)
  const selectedOption = externalSelectedOption;

  const handleOptionClick = (option) => {
    userSelectedOption(option);
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 md:mb-8">
        {quiz?.questionText}
      </h2>

      <div className="space-y-3 md:space-y-4">
        {quiz?.options?.map((option, index) => {
          const isSelected = selectedOption === option;
          
          return (
            <button
              onClick={() => handleOptionClick(option)}
              key={index}
              className={`
                w-full flex items-center border-2 rounded-lg p-4 md:p-5 text-left
                transition-all duration-200 hover:shadow-md
                ${isSelected 
                  ? "border-blue-500 bg-blue-50 text-blue-800" 
                  : "border-gray-200 hover:border-gray-300 text-gray-700"}
              `}
              aria-pressed={isSelected}
            >
              <div className={`
                flex-shrink-0 w-5 h-5 mr-3 rounded-full border-2
                flex items-center justify-center
                ${isSelected 
                  ? "border-blue-500 bg-blue-500" 
                  : "border-gray-400"}
              `}>
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-base md:text-lg">{option}</span>
            </button>
          );
        })}
      </div>
      
      {/* Helper text */}
      <p className="mt-6 text-sm text-gray-500 text-center">
        Select an answer to continue
      </p>
    </div>
  );
}

export default QuizCardItem;
