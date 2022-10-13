import mongoose from "mongoose";
export interface Lesson {
	title: string;
	content: string;
	resource_url: string;
}

export interface LessonDocument extends Lesson, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}
