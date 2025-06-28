import React from "react";
import { SensorProvider } from "./contexts/SensorContext";
import { Dashboard } from "./components/Dashboard";

import "./App.css";

function App() {
	return (
		<>
			<SensorProvider>
				<Dashboard />
			</SensorProvider>
		</>
	);
}

export default App;
