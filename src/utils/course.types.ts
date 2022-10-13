import mongoose from "mongoose";
import { Lesson } from "./lessons.type";
import { UserDocument } from "./user.type";
export interface CourseInput {
	name: string;
	description: string;
	image: string;
	category: string;
	published: boolean;
	lessons: Lesson[];
	instructor: UserDocument["_id"];
}

export interface CourseDocument extends CourseInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}
