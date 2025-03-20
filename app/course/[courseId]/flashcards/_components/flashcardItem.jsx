import React from "react";
import ReactCardFlip from "react-card-flip";

function FlashcardItem({ isFlipped, handleClick, flashcard }) {
  return (
    <div className="flex items-center justify-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div
          className="p-4 border shadow-lg items-center flex bg-blue-500 text-white justify-center rounded-lg cursor-pointer w-[200px] h-[250px] md:w-[300px] md:h-[350px]"
          onClick={handleClick}
        >
          <h2>{flashcard.front}</h2>
        </div>

        <div
          className="p-4 border shadow-lg items-center flex bg-white text-blue-500 justify-center rounded-lg cursor-pointer w-[200px] h-[250px] md:w-[300px] md:h-[350px]"
          onClick={handleClick}
        >
          <h2>{flashcard.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlashcardItem;
