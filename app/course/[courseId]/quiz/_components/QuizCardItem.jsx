import React, { useState } from "react";

function QuizCardItem({ quiz, userSelectedOption }) {
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="mt-10 p-5">
      <h2 className="text-3xl font-md text-center">{quiz?.questionText}</h2>
      <div className="grid grid-cols-2 gap-5 mt-10">
        {quiz?.options?.map((option, index) => (
          <h2
            onClick={() => {
              setSelectedOption(option);
              userSelectedOption(option);
            }}
            key={index}
            variant="outline"
            className={`w-full border rounded-full p-3 text-center text-lg hover:bg-gray-300 cursor-pointer ${
              selectedOption == option &&
              "bg-blue-500 text-white hover:bg-blue-500"
            }`}
          >
            {option}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default QuizCardItem;
