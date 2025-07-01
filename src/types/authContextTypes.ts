export interface AuthContextType {
	isAuthenticated: boolean;
	userEmail: string | null;
	login: (email: string) => void;
	logout: () => void;
}
