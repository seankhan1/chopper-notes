import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
interface SearchProps {
	setSearchNotes: React.Dispatch<React.SetStateAction<string>>;
}
function Navbar({ setSearchNotes }: SearchProps) {
	return (
		<div className="dark:bg-gray-900  px-2 sm:px-0 shadow-md ">
			<div className=" sm:w-3/4  mx-auto flex justify-between items-center py-2  sm:px-0   ">
				<Link to={"/"}>
					<h1 className="font-bold text-2xl dark:text-gray-100 text-gray-600 uppercase">
						Yagami
					</h1>{" "}
				</Link>

				<SearchBar setSearchNotes={setSearchNotes}></SearchBar>
			</div>
		</div>
	);
}

export default Navbar;
