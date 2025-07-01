import type { Sensor } from "../types/Sensor";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "sensorsLS";

let mockSensors: Sensor[] = [];

function initSensors() {
	const stored = getLocalStorage<Sensor[]>(STORAGE_KEY);
	if (stored) {
		mockSensors = stored;
	} else {
		mockSensors = [
			{
				id: "sensor_1",
				name: "Sensor de Temperatura Puente",
				type: "Temperatura",
				value: 24.5,
				status: true,
				updatedAt: new Date().toISOString(),
			},
			{
				id: "sensor_2",
				name: "Sensor de Humedad Motor",
				type: "Humedad",
				value: 56.2,
				status: true,
				updatedAt: new Date().toISOString(),
			},
			{
				id: "sensor_3",
				name: "Sensor de Presión Tanque",
				type: "Presión",
				value: 98.1,
				status: false,
				updatedAt: new Date().toISOString(),
			},
			{
				id: "sensor_4",
				name: "Sensor de Luz Bodega",
				type: "Luz",
				value: 2.01,
				status: true,
				updatedAt: new Date().toISOString(),
			},
		];
		setLocalStorage(STORAGE_KEY, mockSensors);
	}
}

initSensors();

export const sensorService = {
	
	getAll: async (): Promise<Sensor[]> => {
		await new Promise((res) => setTimeout(res, 300));
		return [...mockSensors];
	},

	//*Agregar un sensor
	create: async (sensor: Omit<Sensor, "id" | "updatedAt">): Promise<void> => {
		const newSensor: Sensor = {
			...sensor,
			id: uuidv4(),
			updatedAt: new Date().toISOString(),
		};
		mockSensors.push(newSensor);
		setLocalStorage(STORAGE_KEY, mockSensors);
	},

	// *Editar un sensor 
	update: async (sensor: Sensor): Promise<void> => {
		const index = mockSensors.findIndex((s) => s.id === sensor.id);
		if (index !== -1) {
			mockSensors[index] = sensor;
			setLocalStorage(STORAGE_KEY, mockSensors);
		}
	},

	// *Borrar un sensor
	delete: async (id: string): Promise<void> => {
		const index = mockSensors.findIndex((s) => s.id === id);
		if (index !== -1) {
			mockSensors.splice(index, 1);
			setLocalStorage(STORAGE_KEY, mockSensors);
		}
	},
};
