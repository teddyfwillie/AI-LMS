"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/flashcardItem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Flashcards() {
  const { courseId } = useParams();
  const router = useRouter();

  const [flashcards, setFlashcards] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [api, setApi] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    getFlashCards();
  }, []);

  useEffect(() => {
    if (!api) return;
    
    api.on("select", (e) => {
      setIsFlipped(false);
      setCurrentIndex(e.selectedScrollSnap());
    });
  }, [api]);

  const getFlashCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Flashcard",
      });
      setFlashcards(result?.data);
    } catch (err) {
      console.error("Error fetching flashcards:", err);
      setError("Failed to load flashcards. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCourse = () => {
    router.push(`/dashboard/course/${courseId}`);
  };

  const totalCards = flashcards?.content?.length || 0;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center bg-red-50 dark:bg-red-900/30 p-6 rounded-lg max-w-md">
          <div className="text-red-500 mb-4">
            <Info size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <Button onClick={handleBackToCourse}>Return to Course</Button>
        </div>
      </div>
    );
  }

  if (!flashcards?.content || flashcards.content.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center bg-amber-50 dark:bg-amber-900/30 p-6 rounded-lg max-w-md">
          <div className="text-amber-500 mb-4">
            <Info size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-amber-700 mb-2">No Flashcards Available</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">There are no flashcards available for this course yet.</p>
          <Button onClick={handleBackToCourse}>Return to Course</Button>
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
          className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Click on a card to flip it and reveal the answer. Use the arrows to navigate between cards.
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>Tap or click card to flip</span>
          <span>Card {currentIndex + 1} of {totalCards}</span>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800 rounded-xl p-8 shadow-md">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {flashcards.content.map((flashcard, index) => (
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
          <CarouselPrevious className="absolute -left-4 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute -right-4 top-1/2 transform -translate-y-1/2" />
        </Carousel>

        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            onClick={handleBackToCourse}
            className="mx-auto"
          >
            Return to Course
          </Button>
        </div>
      </div>
    </div>
  );
}


