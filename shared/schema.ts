import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const dummy = pgTable("dummy", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const insertDummySchema = createInsertSchema(dummy).omit({ id: true });
export type InsertDummy = z.infer<typeof insertDummySchema>;
export type Dummy = typeof dummy.$inferSelect;
