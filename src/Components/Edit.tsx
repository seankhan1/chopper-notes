import { FormEvent, useState, useEffect } from "react";
import { Note } from "../App";
import { useParams } from "react-router-dom";

interface PropInterface {
	notes: Note[];
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function Edit({ notes, setNotes }: PropInterface) {
	const [form, setForm] = useState<Note>({ id: null, title: "", body: "" });
	const { id } = useParams();
	useEffect(() => {
		const note = notes.find((t) => t.id === id);
		if (note) {
			setForm(note);
		}
	}, [notes, id]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const noteIndex = notes.findIndex((t) => t.id === id);

		if (noteIndex !== -1) {
			// to store the updated value
			const updatedNote = { ...notes[noteIndex], ...form };

			// a copy of all the notes
			const updatedNotes = [...notes];

			// update the notes
			updatedNotes[noteIndex] = updatedNote;
			localStorage.setItem("NOTES", JSON.stringify(updatedNotes));

			setNotes(updatedNotes);
		}
	};

	return (
		<div className="mt-16 px-2 sm:px-1  ">
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

					{/* <div className="flex flex-col">
						<label
							htmlFor="tags"
							className="text-gray-900 dark:text-gray-100 text-lg font-semibold"
						>
							Tags
						</label>
						<input
							type="text"
							placeholder="Enter tags..."
							aria-label="Tags input"
							value={form.tags.join(", ")} // Display tags as a comma-separated string
							onChange={(e) => {
								setForm({ ...form, tags: e.target.value.split(",") }); // Split input into an array of tags
							}}
							className="dark:text-gray-100 rounded-md p-1 border dark:border-gray-100 border-gray-900 dark:bg-gray-900"
						/>
					</div> */}
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
		</div>
	);
}

export default Edit;
