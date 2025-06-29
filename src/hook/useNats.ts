// src/hooks/useNats.ts
import { useEffect, useState } from "react";
import { connect, StringCodec } from "nats.ws";
import type { NatsConnection } from "nats.ws";
import type { Sensor } from "../types/Sensor";
import { startSensorSimulation } from "../utils/sensorSimulator";

export const useNats = (subject: string) => {
	const [natsConnection, setNatsConnection] = useState<NatsConnection | null>(
		null
	);

	const [sensorList, setSensorList] = useState<Sensor[]>([]);
	const [isSimulated, setIsSimulated] = useState(false);

	//*Conexion a NATS y simulacion de sensores

	useEffect(() => {
		let localConnection: NatsConnection | null = null;
		let stopSimulationFn: (() => void) | null = null;
		let componentMounted = true;

		const connectToNatsOrSimulate = async () => {
			try {
				console.log("Intentando conectar a NATS...");
				localConnection = await connect({ servers: "ws://localhost:4222" });

				if (!componentMounted) {
					await localConnection.close();
					return;
				}

				setNatsConnection(localConnection);
				console.log(" Conectado exitosamente a NATS");

				const stringCodec = StringCodec();
				const subscription = localConnection.subscribe(subject);
				console.log(` Suscripto al tema: ${subject}`);

				for await (const msg of subscription) {
					const rawText = stringCodec.decode(msg.data);

					try {
						const newSensor = JSON.parse(rawText) as Sensor;

						setSensorList((prevList) => {
							const index = prevList.findIndex((s) => s.id === newSensor.id);
							if (index >= 0) {
								const updated = [...prevList];
								updated[index] = newSensor;
								return updated;
							} else {
								return [...prevList, newSensor];
							}
						});
					} catch (err) {
						console.error("⚠️ Error al parsear mensaje JSON:", err);
					}
				}
			} catch (error) {
				console.error("Error conectando a NATS:", error);

				setIsSimulated(true);

				//Simulacion si falla conexion
				stopSimulationFn = startSensorSimulation((fakeSensor) => {
					setSensorList((prevList) => {
						const index = prevList.findIndex((s) => s.id === fakeSensor.id);
						if (index >= 0) {
							const updated = [...prevList];
							updated[index] = fakeSensor;
							return updated;
						} else {
							return [...prevList, fakeSensor];
						}
					});
				});
			}
		};

		connectToNatsOrSimulate();

		// Limpieza
		return () => {
			componentMounted = false;

			if (localConnection) {
				localConnection.close();
				console.log(" Conexión NATS cerrada");
			}

			if (stopSimulationFn) {
				stopSimulationFn();
				console.log(" Simulación detenida");
			}
		};
	}, [subject]);

	return {
		sensores: sensorList,
		conexion: natsConnection,
		esSimulado: isSimulated,
	};
};
