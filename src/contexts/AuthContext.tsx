import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import type { AuthContextType } from "../types/authContextTypes";

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);


//* Guarda si el usuario está logueado en localStorage
//*Al recargar la página, mantiene la sesión activa si estaba logueado
//*login y logout
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
		const savedAuth = getLocalStorage<boolean>("isAuthenticated");
		return savedAuth === true; 
	});

	const [userEmail, setUserEmail] = useState<string | null>(() => {
		return getLocalStorage<string>("userEmail");
	});

	const login = (email: string) => {
		setLocalStorage("isAuthenticated", true);
		setLocalStorage("userEmail", email);
		setIsAuthenticated(true);
		setUserEmail(email);
	};

	const logout = () => {
		localStorage.removeItem("isAuthenticated");
		localStorage.removeItem("userEmail");
		setIsAuthenticated(false);
		setUserEmail(null);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, userEmail, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
