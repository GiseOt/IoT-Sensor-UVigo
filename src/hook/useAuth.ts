import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth debe usarse dentro de AuthProvider");
	}

	const { isAuthenticated, userEmail, login, logout } = context;

	return {
		isAuthenticated,
		userEmail,
		login,
		logout,
	};
};
