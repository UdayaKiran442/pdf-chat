import { eq } from "drizzle-orm";
import type { ICreateUserSchema, ILoginUserSchema } from "../routes/user.route";
import db from "./db";
import { users } from "./schema";

export async function createUserInDb(payload: ICreateUserSchema){
    try {
        const insertPayload = {
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