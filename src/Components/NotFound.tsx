import React from "react";

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center mt-24 md:mt-32">
			<h1 className="text-4xl font-semibold mb-4">404 - Not Found</h1>
			<p className="text-lg text-gray-600">
				The page you are looking for does not exist.
			</p>
		</div>
	);
}

export default NotFound;
