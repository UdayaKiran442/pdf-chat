import express from "express";
import { z } from "zod";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { createUser, getLoggedInUser, loginUser } from "../controller/user.controller";
import type { LoginUserResponse } from "../interface/user.interface";
import { findUserByIdFromDb } from "../repository/user.repository";
import type { DecodedTokenInterface } from "../interface/jwt.interface";

const userRouter = express.Router();

const CreateUserSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export type ICreateUserSchema = z.infer<typeof CreateUserSchema>;

userRouter.post("/create", async (req, res) => {
	try {
		const payload = req.body;
		const response = await createUser(payload);
		return res.status(200).json({
			response,
		});
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
});

const LoginUserSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export type ILoginUserSchema = z.infer<typeof LoginUserSchema>;

userRouter.post("/login", async (req, res) => {
	try {
		const payload = req.body;
		const response = (await loginUser(payload)) as LoginUserResponse;
		return res.status(200).json({
			token: response.token,
			user: response.user,
		});
	} catch (error) {
		return res.status(500).json(error);
	}
});

userRouter.get("/profile", async (req, res) => {
	try {
		const token = req.headers.authorization?.split("Bearer ")[1] as string;
		const decoded = jwt.verify(token, "secret") as DecodedTokenInterface;
		const user = await getLoggedInUser(decoded.userId);
		return res.status(200).json(user);
	} catch (error) {
        if(error instanceof JsonWebTokenError){
            return res.status(500).json("Login to perform action")
        }
		return res.status(500).json(error);
	}
});

export default userRouter;
