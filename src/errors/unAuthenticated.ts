import { StatusCodes } from "http-status-codes";
import CustomError from "./default-error";

class UnAuthenticated extends CustomError {
	private statusCode: number;
	constructor(public message: string) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

export default UnAuthenticated;
