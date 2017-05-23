import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import usersRouter from "./routes/auth";
import notesRouter from "./routes/notes";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Load environment variables from ".env" file
dotenv.config();

// Getting all the keys from .env file
export const PORT = process.env.PORT || 3001;
export const databaseUrl =
	process.env.DATABASE_URL || "mongodb://localhost/Notes";
export const secretKey = process.env.SECRET_KEY || "mys3cr3tk3y";

// const allowedOrigins = ["http://localhost:3000"];
// const corsOptions: cors.CorsOptions = {
// 	origin: (origin, callback) => {
// 		if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error("Not allowed by CORS"));
// 		}
// 	},
// };

// Middleware
app.use(express.json()); // helps read body
app.use(cookieParser());
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
	res.json({ message: "We are at home" });
});

app.use("/", usersRouter);
app.use("/", notesRouter);

// Connecting with database
mongoose
	.connect(databaseUrl, {})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.log(error.message);
	});

// Start the server:
app.listen(PORT, () => {
	console.log(`Server is running at localhost ${PORT}`);
});
