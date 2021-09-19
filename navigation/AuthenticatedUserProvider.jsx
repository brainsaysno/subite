import React, { createContext, useState, useEffect } from "react";

export const AuthenticatedUserContext = createContext({
	user: null,
	setUser: () => {},
	isDriver: null,
	setIsDriver: () => {},
});

export function AuthenticatedUserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isDriver, setIsDriver] = useState(null);
	useEffect(() => {
		console.log("user: " + user);
	}, []);
	return (
		<AuthenticatedUserContext.Provider
			value={{ user, setUser, isDriver, setIsDriver }}
		>
			{children}
		</AuthenticatedUserContext.Provider>
	);
}
