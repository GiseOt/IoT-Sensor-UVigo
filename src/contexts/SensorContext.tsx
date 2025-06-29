import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Sensor } from "../types/Sensor";
import { sensorService } from "../services/sensorService";
import { useNats } from "../hook/useNats";

interface SensorContextProps {
	sensors: Sensor[];
	setSensors: (sensors: Sensor[]) => void;
}

export const SensorContext = createContext<SensorContextProps | undefined>(
	undefined
);

export const SensorProvider = ({ children }: { children: ReactNode }) => {
	const [sensors, setSensors] = useState<Sensor[]>([]);

	useEffect(() => {
		async function loadSensors() {
			const data = await sensorService.getAll();
			setSensors(data);
		}
		loadSensors();
	}, []);

	//*Nats
	const { sensores: natsSensors } = useNats("sensorsNAT");

	useEffect(() => {
		if (natsSensors.length) {
			setSensors((prevSensors) => {
				const sensoresMap = new Map(
					prevSensors.map((sensor) => [sensor.id, sensor])
				);

				natsSensors.forEach((sensorNuevo) => {
					sensoresMap.set(sensorNuevo.id, {
						...sensoresMap.get(sensorNuevo.id),
						...sensorNuevo,
					});
				});

				return Array.from(sensoresMap.values());
			});
		}
	}, [natsSensors]);

	return (
		<SensorContext.Provider value={{ sensors, setSensors }}>
			{children}
		</SensorContext.Provider>
	);
};
