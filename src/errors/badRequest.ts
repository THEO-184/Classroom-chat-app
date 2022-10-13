import CustomError from "./default-error";
import { StatusCodes } from "http-status-codes";

class BadRequest extends CustomError {
	private statusCode: number;
	constructor(public message: string) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

export default BadRequest;
