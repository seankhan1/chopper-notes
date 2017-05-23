import { useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Base_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

function Open() {
	const { id } = useParams();
	const navigate = useNavigate();
	const token = Cookies.get("token");
	const [note, setNote] = useState({ title: "", body: "" });
	console.log(id);

	// const note: Note | undefined = notes.find((t) => t._id === id);

	const fetchNotes = async () => {
		console.log(token);
		const req = await fetch(Base_URL + `/notes/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		let data;
		if (req.ok) {
			data = await req.json();
			console.log(data.notes);
			// setNotes([...data.notes]);
			const finalValue = data.notes[0];
			setNote({ ...finalValue });
		} else {
			console.error({ message: "notes not found", data });
		}
	};

	useEffect(() => {
		console.log(id);
		try {
			fetchNotes();
		} catch (error) {
			console.error("error occured while fetching notes", error);
		}
	}, []);

	return (
		<div className="flex flex-col gap-6 mt-4 mx-2 sm:mx-0">
			<header>
				<button
					className="text-gray-400 text-sm font-normal   hover:text-gray-600 "
					onClick={() => navigate("/home")}
				>
					Home {"/"}
				</button>
			</header>
			<main className="flex flex-col gap-12 justify-center items-center w-full border-2 border-gray-500 rounded-2xl ">
				<h1 className="text-2xl font-bold text-slate-800 text-center w-full bg-gray-200 py-2 rounded-t-2xl">
					{note?.title}
				</h1>
				<p className="text-lg text-slate-600 dark:text-slate-100 font-medium mb-6">
					{note?.body}
				</p>
			</main>
		</div>
	);
}

export default Open;
