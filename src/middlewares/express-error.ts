import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let customErr = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something Went Wrong",
	};

	// Validation Err
	if (err.name === "ValidationError") {
		customErr.msg = Object.values(err.errors)
			.map((err: any) => err.message)
			.join(",");
		customErr.statusCode = StatusCodes.BAD_REQUEST;
	}

	// Duplicates Err
	if (err.code && err.code === 11000) {
		customErr.msg = `Duplicate values entered for ${Object.keys(
			err.keyValue
		)} field,please choose another value`;
		customErr.statusCode = StatusCodes.BAD_REQUEST;
	}

	// cast error
	if (err.name === "CastError") {
		customErr.msg = `No Item found with id : ${err.value}`;
	}

	return res.status(customErr.statusCode).json({ message: customErr.msg });
};

export default errorHandler;
