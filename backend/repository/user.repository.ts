import { eq } from "drizzle-orm";
import type { ICreateUserSchema, ILoginUserSchema } from "../routes/user.route";
import db from "./db";
import { users } from "./schema";
import { v4 as uuid } from "uuid";

export async function createUserInDb(payload: ICreateUserSchema){
    try {
        const newUserId = uuid()
        const insertPayload = {
            userId: newUserId,
            email: payload.email,
            password: payload.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(users).values(insertPayload);
        return insertPayload;
    } catch (error) {
        return error;
    }
}

export async function findUserByEmailFromDb(email: string){
  try {
      const user = await db.select().from(users).where(eq(users.email, email));
      return user[0];
  } catch (error) {
    return error
  }
}

export async function findUserByIdFromDb(userId: string){
    try {
        const user = await db.select().from(users).where(eq(users.userId, userId));
        return user[0]
    } catch (error) {
        return error;
    }
}