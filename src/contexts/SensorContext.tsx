import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Sensor } from "../types/Sensor";
import { sensorService } from "../services/sensorService";

interface SensorContextProps {
  sensors: Sensor[];
  setSensors: (sensors: Sensor[]) => void;
}
  

export const SensorContext = createContext<SensorContextProps | undefined>(undefined);

export const SensorProvider = ({ children }: { children: ReactNode }) => {
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
