import React from "react";
import ReactCardFlip from "react-card-flip";

function FlashcardItem({ isFlipped, handleClick, flashcard }) {
  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" containerClassName="w-full">
        {/* Front of card */}
        <div
          className="p-6 md:p-8 border-2 border-blue-200 shadow-lg flex flex-col items-center justify-center
            bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl cursor-pointer
            w-full h-[250px] md:h-[350px] transition-all duration-300 hover:shadow-xl
            transform hover:-translate-y-1"
          onClick={handleClick}
        >
          <div className="absolute top-3 right-3 text-xs font-medium text-blue-100 bg-blue-700 px-2 py-1 rounded-full">
            Question
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-center">{flashcard.front}</h2>
          <div className="absolute bottom-3 text-xs text-blue-100 flex items-center">
            <span className="mr-1">↓</span> Tap to flip
          </div>
        </div>

        {/* Back of card */}
        <div
          className="p-6 md:p-8 border-2 border-blue-200 dark:border-blue-700 shadow-lg flex flex-col items-center justify-center
            bg-white dark:bg-gray-800 text-blue-800 dark:text-blue-300 rounded-xl cursor-pointer
            w-full h-[250px] md:h-[350px] transition-all duration-300 hover:shadow-xl
            transform hover:-translate-y-1"
          onClick={handleClick}
        >
          <div className="absolute top-3 right-3 text-xs font-medium text-white bg-green-600 px-2 py-1 rounded-full">
            Answer
          </div>
          <div className="text-lg md:text-xl text-center">{flashcard.back}</div>
          <div className="absolute bottom-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <span className="mr-1">↑</span> Tap to flip
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlashcardItem;
