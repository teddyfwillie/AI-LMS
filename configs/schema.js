import {
  pgTable,
  serial,
  varchar,
  boolean,
  text,
  json,
} from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  isMember: boolean().default(false),
  customerId: varchar(),
  credit: serial().default(5),
});

export const STUDY_MATERIAL_TABLE = pgTable("study_materials", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().default("Easy"),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().notNull().default("Generating"),
});

export const CHAPTER_NOTES_TABLE = pgTable("chapter_notes", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: varchar().notNull(),
  note: text(),
});

export const STUDY_TYPE_CONTENT_TABLE = pgTable("study_type_content", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  content: json(),
  type: varchar().notNull(),
  status: varchar().notNull().default("Generating"),
});

export const PAYMENT_RECORD_TABLE = pgTable("payment_records", {
  id: serial().primaryKey(),
  customerId: varchar().notNull(),
  sessionId: varchar().notNull(),
});
