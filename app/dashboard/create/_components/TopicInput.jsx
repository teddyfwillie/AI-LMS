import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TopicInput({ setTopic, setDifficultyLevel }) {
  return (
    <div className="w-full flex flex-col mt-10">
      <h2 className="text-lg text-center mb-2 text-gray-900 dark:text-white">
        What is the topic of your study material?
      </h2>
      <Textarea
        placeholder="Enter topic"
        className="mt-2"
        onChange={(event) => setTopic(event.target.value)}
      />
      <h2 className="text-lg text-center mb-2 w-full text-gray-900 dark:text-white">
        What is the difficulty level of your study material?
      </h2>
      <Select onValueChange={(value) => setDifficultyLevel(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Difficulty Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Moderate">Moderate</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TopicInput;
