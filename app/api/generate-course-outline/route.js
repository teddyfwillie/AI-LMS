import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, topic, courseType, difficultyLevel, createdBy } =
    await req.json();

  const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty  will be ${difficultyLevel} with sumery of course, List of Chapters along with summery  for each chapter, Topic list in each chapter in  JSON format`;

  // Generate Course Outline

  const aiResponse = await courseOutlineAIModel.sendMessage(PROMPT);
  // const aiText = await aiResponse.response.text();
  console.log("AI Response:", aiResponse);
  const aiResult = JSON.parse(aiResponse.response.text());

  // Save to Database

  const dbResult = await db
    .insert(STUDY_MATERIAL_TABLE)
    .values({
      courseId: courseId,
      courseType: courseType,
      topic: topic,
      courseLayout: aiResult, // Ensure it's stringified
      createdBy: createdBy,
    })
    .returning({ resp: STUDY_MATERIAL_TABLE });

  // trigger inngest function to generate notes

  // trigger inngest function to generate notes
const result = await inngest.send({
  name: "note.generate", // Make sure this matches the event name in the function
  data: {
    course: {
      courseId: dbResult[0].resp.courseId,
      courseLayout: dbResult[0].resp.courseLayout,
      // Include any other necessary data
    }
  },
});
  console.log("Note Generation Result:", result.data.resp);
  console.log("DB Insert Result:", dbResult[0].resp);

  return NextResponse.json({ result: dbResult[0] });
}
