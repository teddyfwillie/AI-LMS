import { db } from "@/configs/db";
import { inngest } from "./client";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

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
