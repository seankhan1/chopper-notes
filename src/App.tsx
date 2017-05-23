import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Create from "./Components/Create";
import Open from "./Components/Open";
import Edit from "./Components/Edit";
import Navbar from "./Components/Navbar";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import Welcome from "./Components/Welcome";
import NotFound from "./Components/NotFound";

export interface Note {
	_id: string | null;
	title: string;
	body: string;
}

function App() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [searchNotes, setSearchNotes] = useState<string>("");

	return (
		<div
			className=" dark:bg-slate-800 h-screen
    "
		>
			<Navbar
				setSearchNotes={setSearchNotes}
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
			/>

			<div className="sm:w-3/4 w-screen mx-auto">
				<Routes>
					<Route
						path="/"
						element={<Welcome loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
					></Route>
					<Route
						path="/signup"
						element={
							loggedIn ? (
								<Link to="/home" /> // Redirect to home if logged in
							) : (
								<SignupForm setLoggedIn={setLoggedIn} />
							)
						}
					></Route>
					<Route
						path="/login"
						element={
							loggedIn ? (
								<Link to="/home" /> // Redirect to home if logged in
							) : (
								<LoginForm setLoggedIn={setLoggedIn} />
							)
						}
					></Route>
					{/* {loggedIn ? (
						<>
							<Route
								path="/home"
								element={
									<Home
										searchNotes={searchNotes}
										notes={notes}
										setNotes={setNotes}
									/>
								}
							/>

							<Route
								path="/edit/:id"
								element={<Edit notes={notes} setNotes={setNotes} />}
							/>

							<Route
								path="/create"
								element={<Create notes={notes} setNotes={setNotes} />}
							/>

							<Route path="/open/:id" element={<Open />} />
						</>
					):} */}
					<Route
						path="/home"
						element={
							<Home
								searchNotes={searchNotes}
								notes={notes}
								setNotes={setNotes}
							/>
						}
					/>
					{loggedIn && (
						<Route
							path="/edit/:id"
							element={<Edit notes={notes} setNotes={setNotes} />}
						/>
					)}
					{loggedIn && (
						<Route
							path="/create"
							element={<Create notes={notes} setNotes={setNotes} />}
						/>
					)}
					{loggedIn && <Route path="/open/:id" element={<Open />} />}
					<Route path="*" element={<NotFound />} />{" "}
				</Routes>
			</div>
		</div>
	);
}

export default App;
