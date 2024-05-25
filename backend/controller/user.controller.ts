import type { IUsers } from "../repository/schema";
import { createUserInDb, findUserByEmailFromDb, findUserByIdFromDb } from "../repository/user.repository";
import type { ICreateUserSchema, ILoginUserSchema } from "../routes/user.route";
import generateToken from "../utils/generateToken";

export async function createUser(payload: ICreateUserSchema){
    try {
        return await createUserInDb(payload)
    } catch (error) {
       return error;
    }
}

export async function loginUser(payload: ILoginUserSchema){
    try {
        const user = await findUserByEmailFromDb(payload.email) as IUsers;
        if(!user){
            return "User not found"
        }
        if(user.password !== payload.password){
            return "Incorrect password"
        }
        const token = generateToken(user.userId);
        return {
            token,
            user
        }
    } catch (error) {
        return error
    }
}

export async function getLoggedInUser(userId: string){
    try {
        return await findUserByIdFromDb(userId);
    } catch (error) {
        return error;
    }
}