import { Lesson } from "./../utils/lessons.type";
import { Request, RequestHandler, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import BadRequest from "../errors/badRequest";
import NotFound from "../errors/notFound";
import Course from "../models/course.model";
import { CourseInput } from "../utils/course.types";
import { updateCourseService } from "../utils/services/course.service";
import { Cloudinary } from "../utils/utils";
import { UploadApiResponse } from "cloudinary";
const cloudinary: Cloudinary = require("cloudinary").v2;

export const creatCourseHandler = async (
	req: Request<{}, {}, CourseInput>,
	res: Response
) => {
	req.body.instructor = req.user._id;
	if (!req.files) {
		throw new BadRequest("please choose file");
	}
	const image = req.files.image as UploadedFile;
	if (!image.mimetype.startsWith("image")) {
		throw new BadRequest("file type should be image");
	}
	const photo = await cloudinary.uploader.upload(image.tempFilePath, {
		use_filename: true,
		folder: "file-upload",
	});
	req.body.image = photo.secure_url;
	const course = await (
		await Course.create(req.body)
	).populate("instructor", "name");
	res.status(StatusCodes.OK).json({ course });
};

export const getMyCourses = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response
) => {
	const courses = await Course.find({ instructor: req.params.id }).populate(
		"instructor",
		"name"
	);

	res.status(StatusCodes.OK).json({ count: courses.length, courses });
};

export const getCourse: RequestHandler<{ id: string }, {}, {}> = async (
	req,
	res
) => {
	const course = await Course.findOne({ _id: req.params.id }).populate(
		"instructor",
		"name"
	);
	if (!course) {
		throw new NotFound(`no resource found with id : ${req.params.id}`);
	}

	res.status(StatusCodes.OK).json({ course });
};

export const addLesson: RequestHandler<
	{ courseId: string },
	{},
	Lesson
> = async (req, res) => {
	const { content, resource_url, title } = req.body;
	if (!content || !resource_url || !title) {
		throw new BadRequest("provide all fields");
	}

	const course = await updateCourseService(
		{ _id: req.params.courseId },
		{ $push: { lessons: req.body } }
	);

	res.status(StatusCodes.OK).json({ course });
};

export const updateCourse: RequestHandler<
	{ id: string },
	{},
	Omit<CourseInput, "instructor" | "published">
> = async (req, res) => {
	let imageUrl = "";
	if (req.files) {
		const image = req.files.image as UploadedFile;

		const photo = await cloudinary.uploader.upload(image.tempFilePath, {
			use_filename: true,
			folder: "file-upload",
		});
		imageUrl = photo.secure_url;
		fs.unlinkSync(image.tempFilePath);
	}

	req.body.image = imageUrl;
	const course = await updateCourseService(
		{ _id: req.params.id },
		{ ...req.body }
	);

	res.status(StatusCodes.OK).json({ course });
};
