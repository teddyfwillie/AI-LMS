import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAiModel } from "@/configs/AiModel";

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
      let index = 0;
      Chapters.forEach(async (chapter) => {
        const PROMPT = `Generate exam material detail content for each chapter , Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTMLK , Head, Body, title tag), The chapters: ${JSON.stringify(
          chapter
        )}`;
        const result = await generateNotesAiModel.sendMessage(PROMPT);

        const aiResponse = result.response.text();

        console.log("AI Response:", aiResponse);

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          note: aiResponse,
        });
        index = index + 1;
      });

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
          .where(eq(STUDY_MATERIAL_TABLE.id, course?.courseId));
        return "Success";
        console.log(result);
      }
    );
  }
);
