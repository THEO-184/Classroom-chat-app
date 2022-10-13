import { Router } from "express";
import {
	registerHandler,
	loginHandler,
	logoutHandler,
} from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.route("/register").post(registerHandler);
router.route("/login").post(loginHandler);
router.route("/logout").delete(authMiddleware, logoutHandler);

export default router;
