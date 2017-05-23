import { Link, useNavigate } from "react-router-dom";
import { Note } from "../App";
import deleteImage from "../../public/delete.png";
import editImage from "../../public/edit.svg";
import { useEffect } from "react";

type notesType = {
	searchNotes: string;
	notes: Note[];
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

function Home({ searchNotes, notes, setNotes }: notesType) {
	const navigate = useNavigate();

	useEffect(() => {
		try {
			const storedNotes = localStorage.getItem("NOTES") || "[]";
			const fetchedNotes = storedNotes ? JSON.parse(storedNotes) : [];
			// Only update state if the fetchedNotes are different from the current notes
			if (JSON.stringify(fetchedNotes) !== JSON.stringify(notes)) {
				setNotes([...fetchedNotes]);
			}
		} catch (error) {
			console.error("Error in Home component:", error);
		}
	}, []);

	const handleDelete = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		key: string | null
	) => {
		e.preventDefault();
		const updatedNotes = notes.filter((note) => note.id !== key);
		setNotes(updatedNotes);
		localStorage.setItem("NOTES", JSON.stringify(updatedNotes));
	};

	const handleEdit = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		key: string | null
	) => {
		e.preventDefault();
		navigate(`/edit/${key}`);
	};

	// Filter the notes based on the search input
	const filteredNotes = notes.filter((note) =>
		note.title.toLowerCase().includes(searchNotes.toLowerCase())
	);

	return (
		<div className="mt-12 px-2 flex flex-wrap gap-12 justify-center sm:px-0 ">
			{filteredNotes?.map((note) => (
				<div
					key={note.id}
					className="flex flex-col justify-around w-[240px] h-[160px] dark:bg-gray-600 bg-gray-100 hover:bg-transparent transition-transform transform hover:scale-[101%] duration-200 text-gray-700 dark:text-gray-200 dark:border-white border-gray-700 border-4 rounded-2xl p-3 overflow-clip shadow-sm"
				>
					<main>
						<Link to={`./open/${note.id}`}>
							<h1 className="font-bold text-xl text-gray-800 dark:text-gray-100 hover:cursor-pointer flex flex-wrap">
								{note.title}
							</h1>
						</Link>
						<p className="text-base font-normal mt-2 truncate overflow-ellipsis">
							{note.body}
						</p>
					</main>
					<div className="flex gap-6">
						<button onClick={(e) => handleDelete(e, note.id)}>
							<img
								src={deleteImage}
								alt="delete note button"
								className="h-10 bg-transparent dark:bg-gray-50 p-2 border border-gray-200 rounded-xl hover:bg-gray-200 hover:border-gray-300"
							></img>
						</button>
						<button onClick={(e) => handleEdit(e, note.id)}>
							{" "}
							<img
								src={editImage}
								alt="edit note button"
								className="h-10 bg-transparent dark:bg-gray-50 p-2 border border-gray-200 rounded-xl hover:bg-gray-200 hover:border-gray-300"
							></img>
						</button>
					</div>
				</div>
			))}
			<Link to="/create">
				<svg
					width="240px"
					height="160px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className=""
				>
					<path
						d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
						stroke="#555"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<path
						d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
						stroke="#555"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			</Link>
		</div>
	);
}

export default Home;
