import { Router } from "express";
import {
	addLesson,
	creatCourseHandler,
	getCourse,
	getMyCourses,
} from "../controllers/course.controller";
import authMiddleware from "../middlewares/auth";
import isEducator from "../utils/permissions";

const router = Router();

router.route("/").post(authMiddleware, isEducator, creatCourseHandler);
router
	.route("/:courseId/lesson/new")
	.put(authMiddleware, isEducator, addLesson);
router.route("/:id").get(getCourse);
router.route("/by/:id").get(authMiddleware, isEducator, getMyCourses);

export default router;
