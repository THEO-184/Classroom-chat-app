import { FilterQuery, UpdateQuery } from "mongoose";
import NotFound from "../../errors/notFound";
import Course from "../../models/course.model";
import { CourseDocument } from "../course.types";

export const updateCourseService = async (
	filter: FilterQuery<CourseDocument>,
	update: UpdateQuery<CourseDocument>
) => {
	const course = await Course.findOneAndUpdate(filter, update, {
		new: true,
		runValidators: true,
	}).populate("instructor", "name");

	if (!course) {
		throw new NotFound("no course found with id");
	}

	return course;
};
