import jwt from "jsonwebtoken";
import { secretKey } from "..";

export function generateToken(payload: Record<string, any>) {
	try {
		const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
		return token;
	} catch (error) {
		console.error("Error generating token", error);
		throw error;
	}
}
