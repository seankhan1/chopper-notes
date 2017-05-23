import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true },
});

const notesSchema = new mongoose.Schema({
	email: { type: String, required: true, ref: "Users" },
	title: { type: String, required: true },
	body: { type: String, required: true },
});

export const userModel = mongoose.model("Users", userSchema);
export const notesModel = mongoose.model("Notes", notesSchema);
