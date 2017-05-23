import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Cookies from "js-cookie";
import Chopper from "/chopper.png";
interface SearchProps {
	setSearchNotes: React.Dispatch<React.SetStateAction<string>>;
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ setSearchNotes, loggedIn, setLoggedIn }: SearchProps) {
	const navigate = useNavigate();
	return (
		<div className="dark:bg-gray-900  px-2 sm:px-0 shadow-md ">
			<div className=" sm:w-3/4  mx-auto flex justify-between items-center py-2  sm:px-0   ">
				<main className="flex gap-2">
					<img src={Chopper} alt="logo" className="w-6" />
					{loggedIn ? (
						<Link to={"/home"}>
							<h1 className="font-bold text-2xl dark:text-gray-100 text-gray-600 uppercase">
								Chopper
							</h1>{" "}
						</Link>
					) : (
						<Link to={"/"}>
							<h1 className="font-bold text-2xl dark:text-gray-100 text-gray-600 uppercase">
								Chopper
							</h1>{" "}
						</Link>
					)}
				</main>
				<div className="flex gap-2">
					<SearchBar setSearchNotes={setSearchNotes}></SearchBar>
					{loggedIn && (
						<button
							onClick={() => {
								Cookies.remove("token");
								setLoggedIn(!loggedIn);
								navigate("/");
							}}
							type="submit"
							className="text-gray-100  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg  px-4 py-1 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
