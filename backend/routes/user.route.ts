import express from "express";
import { z } from "zod";

import { createUser, loginUser } from "../controller/user.controller";
import type { LoginUserResponse } from "../interface/user.interface";

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
		const response = await loginUser(payload) as LoginUserResponse;
		return res.status(200).json({
			token: response.token,
            user: response.user
		});
	} catch (error) {
		return res.status(500).json(error);
	}
});

export default userRouter;
