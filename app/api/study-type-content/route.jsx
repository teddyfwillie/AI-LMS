import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { Chapter, courseId, type } = await req.json();

    // Validate input
    if (!Chapter || !courseId || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const PROMPT =
      type == "Flashcard"
        ? `Generate the flashcard on topic: ${Chapter} in JSON format with front back content, Maximum 15.`
        : `Generate Quiz on topic : ${Chapter} with Question and Options along with correct answer in JSON format, (Max 10).`;

    // Insert record into database
    const result = await db
      .insert(STUDY_TYPE_CONTENT_TABLE)
      .values({
        courseId,
        type,
      })
      .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

    // Ensure database insertion was successful
    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "Failed to insert record" },
        { status: 500 }
      );
    }

    const recordId = result[0].id;

    // Trigger Inngest function
    await inngest.send({
      name: "generate-study-type-content",
      data: {
        studyType: type,
        prompt: PROMPT,
        courseId,
        recordId,
      },
    });

    return NextResponse.json({ id: recordId }, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
