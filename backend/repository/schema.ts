import type { InferSelectModel } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users',{
    id: serial('id').primaryKey(),
    email: varchar('email',{length: 256}).notNull(),
    password: varchar('password',{length: 256}).notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
})

export type IUsers = InferSelectModel<typeof users>