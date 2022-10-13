import { tokenPayload, UserDocument } from "./user.type";
import { NextFunction, Request, Response } from "express";
import UnAuthorized from "../errors/unAuthorized";
import User from "../models/User.model";

const isEducator = async (req: Request, res: Response, next: NextFunction) => {
	const user = await User.findOne({ _id: req.user._id });
	if (!user?.educator) {
		throw new UnAuthorized("permission denied");
	}
	next();
};

export const checkPermission = ({
	user,
	resourceId,
}: {
	user: tokenPayload;
	resourceId: UserDocument["_id"];
}) => {
	if (user._id === resourceId.toString()) return;
	throw new UnAuthorized("not authroized to access this resource");
};

export default isEducator;
