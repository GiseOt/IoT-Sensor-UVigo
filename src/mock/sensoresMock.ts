import type { Sensor } from "../types/Sensor";


export let mockSensors: Sensor[] = [
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
