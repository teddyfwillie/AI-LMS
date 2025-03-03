"use client";

import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";

function page() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);

  const handleUserInput = (fileName, fileValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fileName]: fileValue,
    }));
    console.log(formData);
  };
  return (
    <div className="flex flex-col items-center p-8 md:px-24 lg:px-32 mt-20">
      <h2 className="text-4xl font-bold text-primary ">
        Start Building Your Personal Study Material
      </h2>
      <p className="text-gray-500 text-lg">
        Fill the details in order to generate study material for you
      </p>
      <div className="mt-10">
        {step === 0 ? (
          <SelectOption
            selectedStudyType={(value) => handleUserInput("studyType", value)}
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
      <div className="flex gap-4 mt-32 justify-between w-full">
        {step != 0 ? (
          <Button variant={"secondary"} onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        ) : (
          " "
        )}
        {step == 0 ? (
          <Button onClick={() => setStep(1)}>Next</Button>
        ) : (
          <Button>Generate</Button>
        )}
      </div>
    </div>
  );
}

export default page;
