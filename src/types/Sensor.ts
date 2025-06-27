export interface Sensor {
	id: string;
	name: string;
	type: "Temperatura" | "Presión" | "Humedad" | "Luz";
	value: number;
	status: boolean;
	updatedAt: string;
}
