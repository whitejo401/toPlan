import {
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const boardStatus = pgEnum("board_status", [
  "active",
  "archived",
  "template",
]);

export const memberRole = pgEnum("member_role", [
  "owner",
  "admin",
  "member",
  "viewer",
]);

export const boards = pgTable("boards", {
  board_id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  status: boardStatus().default("active").notNull(),
  is_public: boolean().default(false).notNull(),
  cover_image: text(),
  settings: jsonb().$type<{
    theme: string;
    allowComments: boolean;
    allowVoting: boolean;
  }>(),
  created_by: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const boardMembers = pgTable("board_members", {
  board_id: uuid()
    .references(() => boards.board_id, { onDelete: "cascade" })
    .notNull(),
  user_id: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  role: memberRole().default("member").notNull(),
  joined_at: timestamp().notNull().defaultNow(),
});

export const boardInvites = pgTable("board_invites", {
  invite_id: uuid().primaryKey().defaultRandom(),
  board_id: uuid()
    .references(() => boards.board_id, { onDelete: "cascade" })
    .notNull(),
  invited_by: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  email: text().notNull(),
  role: memberRole().default("member").notNull(),
  token: text().notNull(),
  expires_at: timestamp().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});
