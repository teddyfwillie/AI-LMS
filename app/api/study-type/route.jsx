import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, studyType } = await req.json();

  if (studyType === "ALL") {
    const note = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    // Get All other study material

    const result = {
      note: note,
      flashcard: null,
      quiz: null,
      qa: null,
    };
    return NextResponse.json(result);
  }
}
