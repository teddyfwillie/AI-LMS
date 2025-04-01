import { db } from "@/configs/db";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
} from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { and } from "drizzle-orm";

export async function POST(req) {
  const { courseId, studyType } = await req.json();

  if (studyType === "ALL") {
    const note = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    // Get All other study material

    const contentList = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

    const result = {
      note: note,
      flashcard: contentList?.filter((content) => content.type === "Flashcard"),
      quiz: contentList.filter((content) => content.type === "Quiz"),
      qa: null,
    };
    return NextResponse.json(result);
  } else if (studyType == "note") {
    const note = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));
    return NextResponse.json(note);
  } else {
    const result = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
        )
      );
    return NextResponse.json(result[0] ?? []);
  }
}
