import { StatusCodes } from "http-status-codes";
import CustomError from "./default-error";

class UnAuthorized extends CustomError {
	private statusCode: number;
	constructor(public message: string) {
		super(message);
		this.statusCode = StatusCodes.FORBIDDEN;
	}
}
export default UnAuthorized;
