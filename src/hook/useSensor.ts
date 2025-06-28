import { useContext } from "react";
import { SensorContext } from "../contexts/SensorContext";
import { sensorService } from "../services/sensorService";
import type { Sensor } from "../types/Sensor";

interface UseSensorsReturn {
	sensors: Sensor[];
	addSensor: (sensor: Omit<Sensor, "id" | "updatedAt">) => Promise<void>;
	updateSensor: (sensor: Sensor) => Promise<void>;
	deleteSensor: (id: string) => Promise<void>;
}

export const useSensors = (): UseSensorsReturn => {
	const context = useContext(SensorContext);
	if (!context) {
		throw new Error("useSensors debe usarse dentro de SensorProvider");
	}

	const { sensors, setSensors } = context;


    //*Agregar Sensores
	const addSensor = async (sensor: Omit<Sensor, "id" | "updatedAt">) => {
		await sensorService.create(sensor);
		const updatedSensors = await sensorService.getAll();
		setSensors(updatedSensors);
	};

    //*Actualizar Sensore
	const updateSensor = async (sensor: Sensor) => {
		await sensorService.update(sensor);
		const updatedSensors = await sensorService.getAll();
		setSensors(updatedSensors);
	};

    //*Eliminar Sensores
	const deleteSensor = async (id: string) => {
		await sensorService.delete(id);
		const updatedSensors = await sensorService.getAll();
		setSensors(updatedSensors);
	};

	return {
		sensors,
		addSensor,
		updateSensor,
		deleteSensor,
	};
};
