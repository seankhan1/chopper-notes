import { Link, useNavigate } from "react-router-dom";
import { Note } from "../App";
import deleteImage from "../../public/delete.png";
import editImage from "../../public/edit.svg";
import { useEffect } from "react";

type notesType = {
	notes: Note[];
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

function Home({ notes, setNotes }: notesType) {
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

	return (
		<div className="mt-12 px-2 flex flex-wrap gap-12 justify-center sm:px-0 ">
			{notes?.map((note) => (
				<div
					key={note.id}
					className="flex flex-col justify-around w-[240px] h-[160px] bg-transparent  text-gray-700 dark:text-gray-200 dark:border-white border-gray-300 border-4 rounded-2xl p-3 overflow-clip"
				>
					<main>
						<h1 className="font-bold text-xl">{note.title}</h1>
						<p className="text-base font-normal mt-2 truncate overflow-ellipsis">
							{note.body}
						</p>
					</main>
					<div className="flex gap-6">
						<button onClick={(e) => handleDelete(e, note.id)}>
							<img
								src={deleteImage}
								alt="delete note button"
								className="h-6"
							></img>
						</button>
						<button onClick={(e) => handleEdit(e, note.id)}>
							{" "}
							<img src={editImage} alt="edit note button" className="h-5"></img>
						</button>
					</div>
				</div>
			))}
			<Link to="/create">
				<svg
					width="160px"
					height="160px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
						stroke="rgb(229 231 235)"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<path
						d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
						stroke="rgb(229 231 235)"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			</Link>
		</div>
	);
}

export default Home;
