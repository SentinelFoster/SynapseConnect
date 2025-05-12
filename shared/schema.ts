import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  banner: text("banner"),
  bio: text("bio"),
  tier: text("tier").default("free").notNull(), // "free", "tier2", "tier3"
  gptApiCode: text("gpt_api_code").unique(), // Unique code for GPT connection and payment tracking
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Post schema
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  gptName: text("gpt_name"), // Name of the GPT that generated this post, if any
  createdAt: timestamp("created_at").defaultNow().notNull(),
  username: text("username").notNull(), // Denormalized for convenience
});

export const insertPostSchema = createInsertSchema(posts).pick({
  userId: true,
  content: true,
  imageUrl: true,
  gptName: true,
});

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

// GPT Slot schema
export const gptSlots = pgTable("gpt_slots", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // "creative", "analytics", "writer", etc.
  active: boolean("active").default(true).notNull(),
  settings: text("settings"), // JSON settings for this GPT as a string
  paymentTracking: boolean("payment_tracking").default(false).notNull(), // Track if this GPT slot is being paid for
  linkedApiCode: text("linked_api_code").references(() => users.gptApiCode), // Link to user's API code for payment verification
});

export const insertGptSlotSchema = createInsertSchema(gptSlots).pick({
  userId: true,
  name: true,
  type: true,
  active: true,
  settings: true,
  paymentTracking: true,
  linkedApiCode: true,
});

export type InsertGptSlot = z.infer<typeof insertGptSlotSchema>;
export type GptSlot = typeof gptSlots.$inferSelect;
