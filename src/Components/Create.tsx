import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { Note } from "../App";
import Cookies from "js-cookie";

interface PropInterface {
	notes: Note[];
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const Base_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

function Create({ notes, setNotes }: PropInterface) {
	const [form, setForm] = useState<Note>({ _id: null, title: "", body: "" });
	const token = Cookies.get("token");

	const createNoteOnServer = async (newNote: Note) => {
		try {
			// console.log(newNote);
			const createReq = await fetch(Base_URL + "/notes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title: newNote.title, body: newNote.body }),
			});
			// console.log(createReq);

			if (createReq.ok) {
				// Note created on the server
				const data = createReq.json();
				console.log(data);
				return true;
			} else {
				console.error("Failed to create the note on the server.");
				return false;
			}
		} catch (error) {
			console.error(
				"Error occurred while creating the note on the server:",
				error
			);
			return false;
		}
	};

	const handleSubmit = async () => {
		const newNote = { ...form };
		// localStorage.setItem("NOTES", JSON.stringify([...notes, newNote]));

		// Create the same note on the server
		const createdOnServer = await createNoteOnServer(newNote);

		if (createdOnServer) {
			setNotes([...notes, newNote]);
			// console.log("Note created on the server successfully.");
			setForm({ _id: null, title: "", body: "" });
		} else {
			console.error("Couldn't create note on server");
		}
	};

	return (
		<div className="mt-16 px-2 sm:px-1">
			<form onSubmit={(e) => e.preventDefault()} className="max-w-5xl">
				<div className="">
					<label
						htmlFor="title"
						className="text-gray-800 dark:text-gray-100 text-xl font-semibold block mb-2"
					>
						Title
					</label>
					<input
						type="text"
						placeholder="Enter title..."
						aria-label="Title input"
						value={form.title}
						onChange={(e) => {
							setForm({ ...form, title: e.target.value });
						}}
						className="max-w-full w-[440px] dark:text-gray-100 rounded-md p-1 border-2 dark:border-gray-100 border-gray-700 dark:bg-gray-700"
						required
					/>
				</div>
				<div className="flex flex-col mt-12 mb-4">
					<label
						htmlFor="description"
						className="text-gray-800 dark:text-gray-100 text-2xl font-semibold mb-2"
					>
						Notes
					</label>
					<textarea
						rows={12}
						placeholder="Note"
						aria-label="Notes input"
						value={form.body}
						onChange={(e) => {
							setForm({ ...form, body: e.target.value });
						}}
						className="max-w-7xl dark:text-gray-100 rounded-md p-1 border-2 dark:border-gray-100 border-gray-700 dark:bg-gray-700"
						required
					/>
				</div>
				<button
					type="submit"
					onClick={handleSubmit} // Call the submit function when the button is clicked
					className="text-gray-100 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Submit
				</button>
			</form>
		</div>
	);
}

export default Create;
