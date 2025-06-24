"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Function to format note content for better display
const formatNoteContent = (content) => {
  if (!content) return "";
  
  // Check if the content is already HTML (from AiModel.js)
  if (content.includes('<div class="chapter-content">') || 
      content.includes('<section class="topic">')) {
    // Content is already HTML from the AI model, clean it up and enhance formatting
    let formattedContent = content
      .replace(/```html/g, "")
      .replace(/```/g, "");
    
    // Center all headings
    formattedContent = formattedContent
      .replace(/<h1([^>]*)>/g, '<h1$1 class="text-center">')
      .replace(/<h2([^>]*)>/g, '<h2$1 class="text-center">')
      .replace(/<h3([^>]*)>/g, '<h3$1 class="text-center">')
      .replace(/<h4([^>]*)>/g, '<h4$1 class="text-center">');
    
    // Enhance paragraphs
    formattedContent = formattedContent
      .replace(/<p([^>]*)>/g, '<p$1 class="my-4 leading-relaxed text-gray-700 dark:text-gray-300">');
    
    // Enhance sections
    formattedContent = formattedContent
      .replace(/<section class="topic">/g, '<section class="topic mb-8 pb-6 border-b border-gray-200">');
    
    // Enhance key concepts
    formattedContent = formattedContent
      .replace(/<div class="key-concepts">/g, '<div class="key-concepts bg-blue-50 dark:bg-blue-900 p-4 rounded-lg my-4">');
    
    // Enhance exam questions
    formattedContent = formattedContent
      .replace(/<div class="exam-questions">/g, '<div class="exam-questions bg-green-50 dark:bg-green-900 p-4 rounded-lg my-4">');
    
    return formattedContent;
  }
  
  // Otherwise, format markdown-style content
  let formattedContent = content
    .replace(/```html/g, "")
    .replace(/```/g, "");
  
  // Format headings with centered alignment
  formattedContent = formattedContent
    .replace(/# (.+)/g, '<h1 class="text-3xl font-bold mt-8 mb-6 text-center">$1</h1>')
    .replace(/## (.+)/g, '<h2 class="text-2xl font-bold mt-6 mb-4 text-center">$1</h2>')
    .replace(/### (.+)/g, '<h3 class="text-xl font-bold mt-5 mb-3 text-center">$1</h3>');
  
  // Format lists
  formattedContent = formattedContent
    .replace(/^\* (.+)/gm, '<li class="ml-6 list-disc my-2">$1</li>')
    .replace(/^\d+\. (.+)/gm, '<li class="ml-6 list-decimal my-2">$1</li>');
  
  // Wrap lists
  formattedContent = formattedContent
    .replace(/(<li class="ml-6 list-disc.*?<\/li>\s*)+/gs, '<ul class="my-4 pl-4">$&</ul>')
    .replace(/(<li class="ml-6 list-decimal.*?<\/li>\s*)+/gs, '<ol class="my-4 pl-4">$&</ol>');
  
  // Format paragraphs (lines that aren't already wrapped in HTML tags)
  formattedContent = formattedContent
    .replace(/^(?!<[h|u|o|p|d]).+$/gm, '<p class="my-4 leading-relaxed text-gray-700 dark:text-gray-300">$&</p>');
  
  // Format bold and italic text
  formattedContent = formattedContent
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Format code snippets
  formattedContent = formattedContent
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono dark:text-gray-200">$1</code>');
  
  return formattedContent;
};

export default function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]); // Initialize as an empty array
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "note",
      });
      console.log(result?.data);
      setNotes(result?.data || []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 dark:text-gray-400">Loading notes...</p>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">No notes available.</p>;
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount((prev) => prev - 1)}
            disabled={stepCount === 0} // Disable if at first step
            className="flex-shrink-0"
          >
            Previous
          </Button>
          
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {stepCount + 1} of {notes.length}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount((prev) => prev + 1)}
            disabled={stepCount >= notes.length - 1} // Disable if at last step
            className="flex-shrink-0"
          >
            Next
          </Button>
        </div>
        
        <div className="flex gap-1 h-2">
          {notes.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-full rounded-full ${
                index <= stepCount ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Notes Display */}
      <div className="mt-10">
        {notes[stepCount]?.note ? (
          <div className="notes-content max-w-4xl mx-auto">
            <div
              dangerouslySetInnerHTML={{
                __html: formatNoteContent(notes[stepCount]?.note),
              }}
              className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 prose prose-lg max-w-none dark:prose-invert
                prose-headings:text-center prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg 
                prose-p:text-gray-700 prose-p:my-4 prose-p:leading-relaxed
                prose-ul:list-disc prose-ol:list-decimal prose-li:ml-6 prose-li:my-2
                prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                prose-strong:font-bold prose-em:italic
                prose-a:text-blue-600 prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
                prose-hr:my-8"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 dark:text-gray-400">No content available for this note.</p>
          </div>
        )}
      </div>

      {/* End of Notes Message */}
      {stepCount >= notes.length - 1 && (
        <div className="flex items-center gap-5 flex-col justify-center mt-5">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">End of Notes</h1>
          <Button onClick={() => router.push(`/dashboard/course/${courseId}`)}>Go to Course Page</Button>
        </div>
      )}
    </div>
  );
}


