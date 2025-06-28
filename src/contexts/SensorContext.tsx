import React, { createContext, useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import type { Sensor } from "../types/Sensor";
import { sensorService } from "../services/sensorService";

interface SensorContextProps {
	sensors: Sensor[];
	setSensors: React.Dispatch<React.SetStateAction<Sensor[]>>;
}

export const SensorContext = createContext<SensorContextProps | undefined>(
	undefined
);
export const SensorProvider = ({ children }: PropsWithChildren) => {
	const [sensors, setSensors] = useState<Sensor[]>([]);

	useEffect(() => {
		async function loadSensors() {
			const data = await sensorService.getAll();
			setSensors(data);
		}
		loadSensors();
	}, []);

	return (
		<SensorContext.Provider value={{ sensors, setSensors }}>
			{children}
		</SensorContext.Provider>
	);
};
