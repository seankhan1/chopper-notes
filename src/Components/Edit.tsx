import { FormEvent, useState, useEffect } from "react";
import { Note } from "../App";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

interface PropInterface {
	notes: Note[];
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const Base_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

function Edit({ notes, setNotes }: PropInterface) {
	const [form, setForm] = useState<Note>({ _id: null, title: "", body: "" });
	const { id }: { id?: string } = useParams();
	const token = Cookies.get("token");
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	useEffect(() => {
		const note = notes.find((t) => t._id === id);
		if (note) {
			setForm(note);
		}
	}, [notes, id]);

	const editNote = async (key: string) => {
		try {
			setIsLoading(true); // Set loading to true
			const editReq = await fetch(Base_URL + `/notes/${key}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title: form.title, body: form.body }),
			});
			if (editReq.ok) {
				const noteIndex = notes.findIndex((t) => t._id === id);
				console.log(noteIndex);
				if (noteIndex !== -1) {
					const updatedNote = { ...form };
					const updatedNotes = [...notes];
					updatedNotes[noteIndex] = updatedNote;

					setNotes(updatedNotes);

					// Clear the form
					setForm({ _id: null, title: "", body: "" });
				}
				setIsLoading(false);
				return true;
			} else {
				console.error("Failed to edit the note on the server.");
				setIsLoading(false);
				return false;
			}
		} catch (error) {
			console.error(
				"Error occurred while editing the note on the server:",
				error
			);
			setIsLoading(false);
			return false;
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (id) {
			// Call editNote and handle loading and errors
			const success = await editNote(id);
			if (!success) {
				// Handle the case where editNote fails, e.g., show an error message to the user
				console.error("Failed to edit the note.");
			}
		}
	};

	return (
		<div className="mt-16 px-2 sm:px-1  ">
			{isLoading ? (
				<div role="status" className="flex justify-center items-center">
					<svg
						aria-hidden="true"
						className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="sr-only">Loading...</span>
				</div>
			) : (
				<form onSubmit={(e) => handleSubmit(e)} className="max-w-5xl">
					<div className=" ">
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
							className="max-w-full w-[440px]  dark:text-gray-100 rounded-md p-1 border-2 dark:border-gray-100 border-gray-700 dark:bg-gray-700"
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
						className="text-gray-100  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>
						Edit
					</button>
				</form>
			)}
		</div>
	);
}

export default Edit;
