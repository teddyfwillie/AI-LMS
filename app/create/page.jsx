"use client";

import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Page() {
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
    console.log(formData);
  };

  // Generate Course Outline API Call and save user input in database
  const GenerateCourseOutline = async () => {
    const courseId = uuidv4();
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-course-outline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result.data);
      router.replace("/dashboard");
      toast("Course Outline Generated Successfully Please refresh the page");
    } catch (error) {
      console.error("Error generating course outline:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 md:px-24 lg:px-32 mt-20 animate-fade-in">
      {/* Heading Section */}
      <h2 className="text-4xl font-bold text-primary text-center mb-4">
        Start Building Your Personal Study Material
      </h2>
      <p className="text-gray-500 text-lg text-center mb-10">
        Fill the details in order to generate study material for you
      </p>

      {/* Step Content */}
      <div className="w-full max-w-2xl">
        {step === 0 ? (
          <SelectOption
            selectedStudyType={(value) => handleUserInput("courseType", value)}
          />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            setDifficultyLevel={(value) =>
              handleUserInput("difficultyLevel", value)
            }
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-20 w-full max-w-2xl">
        {step !== 0 && (
          <Button
            variant="secondary"
            onClick={() => setStep(step - 1)}
            className="flex-1 hover:bg-gray-100 transition-colors duration-300"
          >
            Previous
          </Button>
        )}
        {step === 0 ? (
          <Button
            onClick={() => setStep(1)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={GenerateCourseOutline}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 transition-colors duration-300"
          >
            {loading ? <Loader className="animate-spin mr-2" /> : "Generate"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Page;
