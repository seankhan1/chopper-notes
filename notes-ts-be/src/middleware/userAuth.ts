import jwt, { JwtPayload } from "jsonwebtoken";
import { secretKey } from "..";
import { Request, Response, NextFunction } from "express";

// to ensire that we are not getting a string type and avoid getting error in line 31
export interface CustomRequest extends Request {
	userData?: JwtPayload | string;
}

export function userAuthenticator(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, secretKey, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			if (!user) {
				return res.sendStatus(404);
			}
			// to ensire that we are not getting a string type
			// and avoid getting error in line 31
			if (typeof user === "string") {
				return res.sendStatus(403);
			}
			console.log(user.email);
			req.userData = user;
			console.log(req.userData);
			next();
		});
	} else {
		res.status(401).json({ message: "Token not found" });
	}
	return;
}
