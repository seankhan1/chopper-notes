import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Chopper from "/chopper.png";

interface PropsInterface {
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Welcome({ loggedIn, setLoggedIn }: PropsInterface) {
	const navigate = useNavigate();
	return (
		<div className="mt-12 px-2 flex flex-col   gap-12 justify-center items-center sm:px-0 ">
			<img src={Chopper} alt="logo" className="w-32" />{" "}
			<h1 className="text-2xl dark:text-gray-100 text-gray-900  font-semibold  uppercase">
				Welcome To <span className=" text-blue-600 ">"Chopper"</span>
			</h1>
			{!loggedIn ? (
				<main>
					<button
						onClick={() => navigate("/signup")}
						type="submit"
						className="text-gray-100  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>
						SignUp
					</button>{" "}
					<button
						onClick={() => navigate("/login")}
						type="submit"
						className="text-gray-100  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>
						Login
					</button>
				</main>
			) : (
				<main>
					<button
						onClick={() => {
							Cookies.remove("token");
							setLoggedIn(!loggedIn);
						}}
						type="submit"
						className="text-gray-100  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>
						Logout
					</button>
					<button
						onClick={() => navigate("/home")}
						type="submit"
						className="text-gray-100  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>
						Home
					</button>
				</main>
			)}
			<footer className="fixed bottom-0 uppercase  dark:text-gray-100 text-gray-800  font-medium">
				{" "}
				made by{" "}
				<a
					href="https://github.com/Heismanish"
					target="blank"
					className="dark:text-gray-300 text-blue-800"
				>
					HEISMANISH
				</a>{" "}
				, Find the code on
				<a
					href="https://github.com/Heismanish"
					target="blank"
					className="dark:text-gray-300 text-blue-800"
				>
					{" "}
					GITHUB
				</a>{" "}
			</footer>
		</div>
	);
}

export default Welcome;
