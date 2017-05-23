import bcrpty from "bcrypt";
import express, { Request, Response } from "express";
import { userModel } from "../db";
import { generateToken } from "../utils/jwtUtils";
// import { userAuthenticator } from "../middleware/userAuth";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const securePassword = await bcrpty.hash(password, 10);

		// check for existing user
		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			res.status(400).json({ message: "user already exists" });
		}

		// if not existing, create user: add user info to db
		const newUser = new userModel({ email, password: securePassword });
		await newUser.save();

		const token = generateToken({ email: newUser.email, userId: newUser._id });

		res.cookie("token", token, { maxAge: 3_600_000 });
		res.status(200).json({ token, message: "user created succesfully" });
	} catch (error) {
		console.error("Error creating user: ", error);
		res.status(500).json({ message: "Error creating user", error });
	}
});

router.post(
	"/signin",

	async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			// check for existing user:
			const existingUser = await userModel.findOne({ email });
			if (existingUser) {
				// compare password
				bcrpty.compare(
					password,
					existingUser.password,
					(err, matchedPassword) => {
						if (err) {
							// if some error occured
							res
								.status(400)
								.json({ message: "Error while verifying password" });
						} else if (matchedPassword) {
							// if password matched
							const token = generateToken({
								email: existingUser.email,
								userId: existingUser._id,
							});
							res.cookie("token", token, { maxAge: 3_600_000 });
							res.json({ message: "User signed In", token });
						} else {
							// password didn't match
							res.status(404).json({ message: "Invalid password" });
						}
					}
				);
			} else {
				res.status(404).json({ message: "User not found." });
			}
		} catch (error) {
			console.error("Error while logging in", error);
			res.status(500).json({ message: "Error during sign-in" });
		}
	}
);

export default router;
