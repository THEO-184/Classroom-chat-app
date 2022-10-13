import mongoose from "mongoose";
import { tokenPayload, UserDocument } from "./user.type";
declare module "express-serve-static-core" {
	interface Request {
		user: tokenPayload;
	}
}

export interface Token {
	user: UserDocument["_id"];
	ip: string;
	userAgent: string;
	refreshToken: string;
	isValid: boolean;
}

export interface TokenDocument extends Token, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}
