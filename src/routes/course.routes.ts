import { Router } from "express";
import {
	addLesson,
	creatCourseHandler,
	deleteCourse,
	getCourse,
	getMyCourses,
	updateCourse,
} from "../controllers/course.controller";
import authMiddleware from "../middlewares/auth";
import isEducator from "../utils/permissions";

const router = Router();

router.route("/").post(authMiddleware, isEducator, creatCourseHandler);
router
	.route("/:courseId/lesson/new")
	.put(authMiddleware, isEducator, addLesson);
router
	.route("/:id")
	.get(getCourse)
	.put(authMiddleware, isEducator, updateCourse)
	.delete(authMiddleware, isEducator, deleteCourse);

router.route("/by/:id").get(authMiddleware, isEducator, getMyCourses);

export default router;
