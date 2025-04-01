"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/flashcardItem";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Flashcards() {
  const { courseId } = useParams();

  const [flashcards, setFlashcards] = useState(null);
  const [isFlipped, setIsFlipped] = useState();
  const [api, setApi] = useState();

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    GetFlashCards();
  }, []);
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      setIsFlipped(false);
    });
  }, [api]);

  const GetFlashCards = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "Flashcard",
    });
    setFlashcards(result?.data);
    console.log(result.data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Flashcards</h2>
      <p className="mb-4">
        Flashcards are a great way to remember important points.
      </p>

      <div className="mt-10">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {flashcards?.content &&
              flashcards.content.map((flashcard, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center"
                >
                  <FlashcardItem
                    front={flashcard.front}
                    back={flashcard.back}
                    handleClick={handleClick}
                    isFlipped={isFlipped}
                    flashcard={flashcard}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}

export default Flashcards;
