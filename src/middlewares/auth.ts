import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UnAuthenticated from "../errors/unAuthenticated";
import { tokenPayload } from "../utils/user.type";
import Token from "../models/token.model";
import { attachCookie } from "../utils/jwt";

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { accessToken, refreshToken } = req.signedCookies;

	try {
		if (accessToken) {
			const decoded = jwt.verify(
				accessToken,
				process.env.JWT_SECRET!
			) as tokenPayload;
			const user = decoded;
			req.user = user;
			return next();
		}

		const decoded = jwt.verify(
			refreshToken,
			process.env.JWT_SECRET!
		) as tokenPayload;
		const existingToken = await Token.findOne({
			user: decoded._id,
			refreshToken: decoded.refreshPayload,
		});
		if (!existingToken || !existingToken.isValid) {
			throw new UnAuthenticated("user not authenticated");
		}
		const { name, email, _id } = decoded;
		const payload = { name, email, _id };
		const refreshPayload = existingToken.refreshToken;
		attachCookie({ res, payload, refreshPayload });
		req.user = decoded;
		next();
	} catch (error) {
		throw new UnAuthenticated("user not authenticated");
	}
};

export default authMiddleware;
