import { Request, RequestHandler, Response } from "express";
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import BadRequest from "../errors/badRequest";
import NotFound from "../errors/notFound";
import User from "../models/User.model";
import { attachCookie } from "../utils/jwt";
import { UserInput } from "../utils/user.type";
import Token from "../models/token.model";
import UnAuthenticated from "../errors/unAuthenticated";

export const registerHandler: RequestHandler<{}, {}, UserInput> = async (
	req,
	res
) => {
	const user = await User.create(req.body);
	const { name, _id, email } = user;
	const payload = { name, _id, email };
	attachCookie({ res, payload });

	res.status(StatusCodes.CREATED).json({ user: { name, _id, email } });
};

export const loginHandler: RequestHandler<
	{},
	{},
	Pick<UserInput, "email" | "password">
> = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequest("provide password and email");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new UnAuthenticated("Invalid credentials");
	}
	const isPasswordMatch = await user.comparePassword(password);
	if (!isPasswordMatch) {
		throw new UnAuthenticated("Invalid credentials");
	}
	const { name, _id } = user;
	const payload = { name, _id, email };
	// check for refreshToken
	let refreshPayload = "";
	// create token for first time
	const existingToken = await Token.findOne({ user: user._id });
	if (existingToken) {
		const { isValid } = existingToken;
		if (!isValid) {
			throw new UnAuthenticated("Invalid credentials");
		}
		refreshPayload = existingToken.refreshToken;
		attachCookie({ res, payload, refreshPayload });
		res
			.status(StatusCodes.OK)
			.json({ user: { name, _id, email, educator: user?.educator } });
		return;
	}

	const refreshToken = crypto.randomBytes(40).toString("hex");
	const userAgent = req.headers["user-agent"];
	const ip = req.ip;

	refreshPayload = refreshToken;
	await Token.create({
		refreshToken,
		userAgent,
		ip,
		user: user._id,
	});
	attachCookie({ res, payload, refreshPayload });
	res
		.status(StatusCodes.OK)
		.json({ user: { name, _id, email, educator: user?.educator } });
};

export const logoutHandler = async (req: Request, res: Response) => {
	await Token.findOneAndDelete({ user: req.user._id });

	res.cookie("accessToken", "", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.cookie("refreshToken", "", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});

	res.status(StatusCodes.OK).json({ message: "logout succesfue" });
};
