import mongoose, { Schema, model } from "mongoose";
import { CourseDocument } from "../utils/course.types";
import Lesson, { LessonSchema } from "./Lesson.model";

const CourseSchema = new Schema<CourseDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		instructor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		published: {
			type: Boolean,
			default: false,
		},
		lessons: [LessonSchema],
	},
	{ timestamps: true }
);

const Course = model<CourseDocument>("Course", CourseSchema);

export default Course;
