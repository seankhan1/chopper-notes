import express, { Response, Request } from "express";
import { notesModel } from "../db";
import { CustomRequest, userAuthenticator } from "../middleware/userAuth";
// import { JwtPayload } from "jsonwebtoken";

const router = express.Router();

interface NoteInterface {
	email?: string;
	title: string;
	body: string;
}

// create a new note
router.post(
	"/notes",
	userAuthenticator,
	async (req: CustomRequest, res: Response) => {
		try {
			if (typeof req.userData === "string" || req.userData === undefined) {
				// To evade TypeScript type error
				res.json({ message: "Error while dealing with TypeScript " });
			} else {
				const noteBody: NoteInterface = {
					email: req.userData.email,
					title: req.body.title,
					body: req.body.body,
				};
				var newNote;
				if (noteBody) {
					newNote = new notesModel(noteBody);
					await newNote.save();
					console.log(newNote);
					res.json({ message: "New note added to db" });
				} else {
					res
						.status(403)
						.json({ message: "Failed to add note to db", note: newNote });
				}
			}
		} catch (error) {
			res
				.status(500)
				.json({ message: "Error occured while adding note to db", error });
		}
	}
);

router.get(
	"/notes",
	userAuthenticator,
	async (req: CustomRequest, res: Response) => {
		try {
			if (typeof req.userData === "string" || req.userData === undefined) {
				// To evade TypeScript type error
				res.json({ message: "Error while dealing with TypeScript " });
			} else {
				console.log("User Email:", req.userData.email);
				// Find all notes associated with the user's email
				const notes = await notesModel.find({ email: req.userData.email + "" });

				res.json({ notes });
			}
		} catch (error) {
			console.error("Error while fetching notes", error);
			res.status(500).json({ message: "Error while fetching notes", error });
		}
	}
);

router.get(
	"/notes/:noteId",
	userAuthenticator,
	async (req: CustomRequest, res: Response) => {
		try {
			if (typeof req.userData === "string" || req.userData === undefined) {
				// To evade TypeScript type error
				res.json({ message: "Error while dealing with TypeScript " });
			} else {
				const noteId = req.params.noteId;
				console.log("note id:", noteId);
				// Find all notes associated with the user's email
				const notes = await notesModel.find({ _id: noteId });

				res.json({ notes });
			}
		} catch (error) {
			console.error("Error while fetching notes", error);
			res.status(500).json({ message: "Error while fetching notes", error });
		}
	}
);

router.put(
	"/notes/:noteId",
	userAuthenticator,
	async (req: CustomRequest, res: Response) => {
		try {
			if (typeof req.userData === "string" || req.userData === undefined) {
				// To evade TypeScript type error
				res.json({ message: "Error while dealing with TypeScript " });
			} else {
				const newNote: NoteInterface = {
					email: req.userData.email,
					title: req.body.title,
					body: req.body.body,
				};
				const noteId = req.params.noteId;

				// Validate the newNote data here (e.g., required fields, data format, etc.)
				if (!newNote || !newNote.title || !newNote.body) {
					return res.status(400).json({ message: "Invalid note data" });
				}

				const result = await notesModel.replaceOne({ _id: noteId }, newNote);

				if (result.matchedCount === 0) {
					// No matching document found, return a 404 status
					return res.status(404).json({ message: "Note not found" });
				} else {
					res.json({ message: "Note edited successfully", newNote });
				}
			}
		} catch (error) {
			console.error("Error occureed while editing", error);
			res
				.status(500)
				.json({ message: "Error occured while editing note", error });
		}
	}
);

router.delete(
	"/notes/:noteId",
	userAuthenticator,
	async (req: Request, res: Response) => {
		try {
			// const newNote = req.body;
			const noteId = req.params.noteId;
			const result = await notesModel.deleteOne({ _id: noteId });

			if (result.deletedCount === 0) {
				return res.status(404).json({ message: "Note not found" });
			} else {
				res.json({ message: "Note successfully deleted", result });
			}
		} catch (error) {
			console.error("Error occureed while deleting", error);

			res
				.status(500)
				.json({ message: "Error occured while deleting note", error });
		}
	}
);

export default router;
