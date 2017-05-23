import { useNavigate, useParams } from "react-router-dom";
import { Note } from "../App";

function Open({ notes }: { notes: Note[] }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const note: Note | undefined = notes.find((t) => t.id === id);

	if (!note) {
		// Handle the case where the note with the specified id is not found.
		return (
			<div className="text-2xl font-bold mx-auto my-12">Note not found.</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 mt-4 mx-2 sm:mx-0">
			<header>
				<button
					className="text-gray-400 text-sm font-normal   hover:text-gray-600 "
					onClick={() => navigate("/")}
				>
					Home {"/"}
				</button>
			</header>
			<main className="flex flex-col gap-12 justify-center items-center w-full border-2 border-gray-500 rounded-2xl ">
				<h1 className="text-2xl font-bold text-slate-800 text-center w-full bg-gray-200 py-2 rounded-t-2xl">
					{note.title}
				</h1>
				<p className="text-lg text-slate-600 dark:text-slate-100 font-medium mb-6">
					{note.body}
				</p>
			</main>
		</div>
	);
}

export default Open;
