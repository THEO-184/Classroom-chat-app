import mongoose, { Schema, model } from "mongoose";
import { TokenDocument } from "../utils/token.type";

const TokenSchema = new Schema<TokenDocument>(
	{
		refreshToken: {
			type: String,
			required: true,
		},
		ip: {
			type: String,
			required: true,
		},
		userAgent: {
			type: String,
			required: true,
		},
		isValid: {
			type: Boolean,
			default: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Token = model<TokenDocument>("Token", TokenSchema);

export default Token;
