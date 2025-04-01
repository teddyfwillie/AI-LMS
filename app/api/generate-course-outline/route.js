import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { courseId, topic, courseType, difficultyLevel, createdBy } =
      await req.json();

    const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter in JSON format`;

    // Generate Course Outline
    const aiResponse = await courseOutlineAIModel.sendMessage(PROMPT);
    const aiText = aiResponse.response.text();

    // Log raw AI response for debugging
    console.log("Raw AI Response:", aiText);

    // Clean response if wrapped in markdown code blocks
    const cleanedAiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const aiResult = JSON.parse(cleanedAiText);

    // Save to Database (stringify the JSON)
    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId: courseId,
        courseType: courseType,
        topic: topic,
        courseLayout: JSON.stringify(aiResult), // Stringify the JSON
        createdBy: createdBy,
      })
      .returning({ resp: STUDY_MATERIAL_TABLE });

    // Trigger Inngest function
    await inngest.send({
      name: "note.generate",
      data: {
        course: {
          courseId: dbResult[0].resp.courseId,
          courseLayout: dbResult[0].resp.courseLayout,
        },
      },
    });

    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
