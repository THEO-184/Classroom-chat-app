import "express-async-errors";
import express, { NextFunction, Request } from "express";
import dotenv from "dotenv";
dotenv.config();
import fileUpload from "express-fileupload";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDb from "./db/db";
import errorHandler from "./middlewares/express-error";
const cloudinary = require("cloudinary").v2;

// routes
import authRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.routes";

//
// cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_APIKEY,
	api_secret: process.env.CLOUD_SECRET,
});

// middlewares

const app = express();
app.use(morgan("tiny"));
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes

app.get("/", (req, res) => {
	res.send("home");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/course", courseRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDb(process.env.MONGO_URI!);
		app.listen(PORT, () => {
			console.log(`server running on port ${PORT}`);
		});
	} catch (error) {
		console.log("error", error);
	}
};

start();
