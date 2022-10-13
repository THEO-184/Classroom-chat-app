import { Schema, model } from "mongoose";
import { LessonDocument } from "../utils/lessons.type";

export const LessonSchema = new Schema<LessonDocument>({
	title: {
		type: String,
		require: true,
		trim: true,
	},
	content: {
		type: String,
		require: true,
		trim: true,
	},
	resource_url: {
		type: String,
		require: true,
		trim: true,
	},
});

const Lesson = model<LessonDocument>("Lesson", LessonSchema);

export default Lesson;
