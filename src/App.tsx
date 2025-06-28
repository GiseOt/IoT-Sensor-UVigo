import React from "react";
import { SensorProvider } from "./contexts/SensorContext";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";

import "./App.css";

function App() {
	return (
		<>
			<SensorProvider>
                <Header />
				<Dashboard />
			</SensorProvider>
		</>
	);
}

export default App;
