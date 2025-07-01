import { SensorProvider } from "./contexts/SensorContext";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hook/useAuth";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { LoginForm } from "./components/LoginForm";
import { Footer } from "./components/Footer";

import "./App.css";
const AppContent = () => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <LoginForm />;
	}

	return (
		<>
			<Header />
			<Dashboard />
            <Footer/>
		</>
	);
};

function App() {
	return (
		<AuthProvider>
			<SensorProvider>
				<AppContent />
			</SensorProvider>
		</AuthProvider>
	);
}

export default App;
