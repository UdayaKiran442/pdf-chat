import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users',{
    id: serial('id').primaryKey(),
    email: varchar('email',{length: 256}).notNull(),
    password: varchar('password',{length: 256}).notNull()
})