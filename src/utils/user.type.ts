import mongoose from "mongoose";
export interface UserInput {
	name: string;
	email: string;
	password: string;
	educator: boolean;
}

export interface UserDocument extends UserInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(password: string): Promise<boolean>;
}

export type tokenPayload = Pick<UserDocument, "name" | "email" | "_id"> & {
	refreshPayload?: string;
};
