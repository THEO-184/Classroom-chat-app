import { Response } from "express";
import jwt from "jsonwebtoken";
import { tokenPayload } from "./user.type";

const createJWT = (payload: tokenPayload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET!);
	return token;
};

export const attachCookie = ({
	res,
	payload,
	refreshPayload,
}: {
	res: Response;
	payload: tokenPayload;
	refreshPayload?: string;
}) => {
	const accessToken = createJWT(payload);
	const refreshToken = createJWT({ ...payload, refreshPayload });

	const oneHour = 1000 * 60 * 60 * 1;
	const oneDay = 1000 * 60 * 60 * 24;

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		signed: true,
		maxAge: oneHour,
		secure: process.env.NODE_ENV === "production",
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		signed: true,
		maxAge: oneDay,
		secure: process.env.NODE_ENV === "production",
	});
};
