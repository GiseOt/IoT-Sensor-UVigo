import type { Sensor } from "../types/Sensor";
import { mockSensors } from "../mock/sensoresMock"; 

const updateSensorValue = (sensor: Sensor): Sensor => {
	let newValue: number;
	switch (sensor.type) {
		case "Temperatura":
			newValue = Math.random() * 40;
			break;
		case "Humedad":
			newValue = Math.random() * 100;
			break;
		case "Presión":
			newValue = 950 + Math.random() * 100;
			break;
		case "Luz":
			newValue = Math.random() * 1000;
			break;
		default:
			newValue = sensor.value;
	}
	return {
		...sensor,
		value: parseFloat(newValue.toFixed(2)),
		status: Math.random() > 0.2,
		updatedAt: new Date().toISOString(),
	};
};

export const startSensorSimulation = (
	callback: (sensor: Sensor) => void,
	interval = 5000
) => {
	const intervalId = setInterval(() => {
		for (const sensor of mockSensors) {
			const updatedSensor = updateSensorValue(sensor);
			callback(updatedSensor);
		}
	}, interval);

	return () => clearInterval(intervalId);
};
