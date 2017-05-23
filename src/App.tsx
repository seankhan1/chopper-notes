import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Create from "./Components/Create";
// import Open from "./Components/Open";
import Edit from "./Components/Edit";
import Navbar from "./Components/Navbar";

export interface Note {
	id: string | null;
	title: string;
	body: string;
}

function App() {
	const [notes, setNotes] = useState<Note[]>([]);
	console.log(notes);
	return (
		<div
			className=" dark:bg-slate-800 h-screen
    "
		>
			<Navbar />

			<div className="sm:w-2/3 w-screen mx-auto">
				<Routes>
					<Route
						path="/"
						element={<Home notes={notes} setNotes={setNotes} />}
					/>
					<Route
						path="/edit/:id"
						element={<Edit notes={notes} setNotes={setNotes} />}
					/>
					<Route
						path="/create"
						element={<Create notes={notes} setNotes={setNotes} />}
					/>
					{/* <Route path="/open" element={<Open notes={notes} />} /> */}
				</Routes>
			</div>
		</div>
	);
}

export default App;
