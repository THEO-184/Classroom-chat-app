class CustomError extends Error {
	constructor(public message: string) {
		super(message);
	}
}

export default CustomError;
