import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

interface LoginProps {
	email: string;
	password: string;
}

const Base_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const LoginForm = ({
	setLoggedIn,
}: {
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const navigate = useNavigate();
	const [signup, setSignup] = useState<LoginProps>({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSignup((prev) => ({ ...prev, email: e.target.value }));
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSignup((prev) => ({ ...prev, password: e.target.value }));
	}

	const validateForm = () => {
		let isValid = true;
		const updatedErrors = {
			email: "",
			password: "",
		};

		// Validate email
		if (!signup.email) {
			updatedErrors.email = "Email is required";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(signup.email)) {
			updatedErrors.email = "Invalid email format";
			isValid = false;
		}

		// Validate password
		if (!signup.password) {
			updatedErrors.password = "Password is required";
			isValid = false;
		} else if (signup.password.length < 8) {
			updatedErrors.password = "Password must be at least 8 characters";
			isValid = false;
		}

		setErrors(updatedErrors);
		return isValid;
	};

	const signUpCall = async ({ email, password }: LoginProps) => {
		try {
			const req = await fetch(Base_URL + "/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			let data;
			if (req.ok) {
				data = await req.json();
				console.log("User successfully signed in", data);
				Cookies.set("token", data.token, { expires: 7 }); // Expires in 7 days
				setLoggedIn(true);
				navigate("/home");
			} else {
				console.log("Signup failed", data);
			}
		} catch (error) {
			console.error("Error occured during sign-in", error);
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			// Form is valid, perform submission
			console.log("Form data:", signup);
			// Add your API call or other submission logic here
			signUpCall(signup);
		} else {
			// Form is invalid, display errors
			console.log("Form validation failed");
		}
	};

	return (
		<div className="mt-16 mx-2 md:mx-0  md:mt-36 flex items-center justify-center  dark:bg-slate-800">
			<div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border-2">
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="mb-6">
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Your email
						</label>
						<input
							type="email"
							id="email"
							className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
								errors.email ? "border-red-500" : ""
							}`}
							placeholder="example@gmail.com"
							required
							value={signup.email}
							onChange={(e) => {
								handleEmailChange(e);
							}}
						/>
						{errors.email && (
							<span className="text-red-500 text-sm">{errors.email}</span>
						)}
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Your password
						</label>
						<input
							type="password"
							id="password"
							className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
								errors.password ? "border-red-500" : ""
							}`}
							required
							value={signup.password}
							onChange={(e) => {
								handlePasswordChange(e);
							}}
						/>
						{errors.password && (
							<span className="text-red-500 text-sm">{errors.password}</span>
						)}
					</div>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Login
					</button>
				</form>
			</div>{" "}
		</div>
	);
};

export default LoginForm;
