import { StatusCodes } from "http-status-codes";
import CustomError from "./default-error";

class NotFound extends CustomError {
	private statusCode: number;
	constructor(public message: string) {
		super(message);
		this.statusCode = StatusCodes.NOT_FOUND;
	}
}

export default NotFound;
