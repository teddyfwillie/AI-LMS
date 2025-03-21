import { db } from "@/configs/db";
import { inngest } from "./client";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  USER_TABLE,
} from "@/configs/schema";
import { eq } from "drizzle-orm";
import {
  generateNotesAiModel,
  GenerateQuizAiModel,
  GenerateStudyTypeContentAiModel,
} from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { event, body: "Hello World!" };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-new-user" },
  { event: "user.create.new.user" },
  async ({ event, step }) => {
    // Get Event Data
    const { user } = event.data;
    const result = await step.run(
      "Check User and New User If Not Exist in Database",
      async () => {
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        console.log(result);

        if (result.length == 0) {
          // if not exist then create new user
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });
          console.log(userResp);

          return userResp;
        }

        return result;
      }
    );
    return "Success";
  }

  // Send Email Welcome Notification

  // Send Email Welcome Notification After Three Days When New User Created
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-note" },
  { event: "note.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    const notesResult = await step.run("Generate Note", async () => {
      const Chapters = course?.courseLayout?.chapters;
      // Use Promise.all with map instead of forEach
      await Promise.all(
        Chapters.map(async (chapter, index) => {
          const PROMPT = `Generate exam material detail content for each chapter , Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTMLK , Head, Body, title tag), The chapters: ${JSON.stringify(
            chapter
          )}`;

          const result = await generateNotesAiModel.sendMessage(PROMPT);
          const aiResponse = await result.response.text();

          console.log("AI Response for chapter", index, ":", aiResponse);

          // Insert note for this chapter
          await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId: index,
            courseId: course?.courseId,
            note: aiResponse,
          });
        })
      );

      return "Success";
    });

    // update course status
    const updateCourseStatus = await step.run(
      "Update Course Status",
      async () => {
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({
            status: "completed",
          })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));

        console.log("Course status update result:", result);
        return "Success";
      }
    );

    return { notesResult, updateCourseStatus };
  }
);

// Generate Study Type Content, Question and Answer
export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "generate-study-type-content" },
  { event: "generate-study-type-content" },
  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;

    const AIResult = await step.run("Generate Flashcard", async () => {
      const result =
        studyType == "Flashcard"
          ? await GenerateStudyTypeContentAiModel.sendMessage(prompt)
          : await GenerateQuizAiModel.sendMessage(prompt);
      const aiResponse = await JSON.parse(result.response.text());
      return aiResponse;
    });

    // insert flashcard to database

    const DbResult = await step.run("Insert Flashcard", async () => {
      const result = await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: AIResult,
          status: "ready",
        })
        .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

      return "Success";
    });

    // return { FlashcardAiResult };
  }
);
