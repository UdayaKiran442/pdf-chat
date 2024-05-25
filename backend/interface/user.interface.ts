import type { IUsers } from "../repository/schema";

export interface LoginUserResponse {
    token: string,
    user: IUsers
}