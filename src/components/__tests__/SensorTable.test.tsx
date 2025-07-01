import { render, screen } from "@testing-library/react";
import { SensorTable } from "../SensorTable";
import type { Sensor } from "../../types/Sensor";

// Mock del hook useSensors si SensorTable lo usa
jest.mock("../../hook/useSensor", () => ({
	useSensors: () => ({
		deleteSensor: jest.fn(),
		updateSensor: jest.fn(),
		addSensor: jest.fn(),
	}),
}));

const sensors: Sensor[] = [
	{
		id: "1",
		name: "Sensor 1",
		type: "Temperatura",
		value: 23.5,
		status: true,
		updatedAt: "2024-06-30T12:00:00Z",
	},
];

//* Test para verificar que los Sensores se renderizan correctamente
describe("SensorTable", () => {
	it("muestra los sensores en la tabla", () => {
		render(<SensorTable sensors={sensors} />);
		expect(screen.getByText("Sensor 1")).toBeInTheDocument();
		expect(screen.getByText("Temperatura")).toBeInTheDocument();
	});

	it("muestra mensaje si no hay sensores", () => {
		render(<SensorTable sensors={[]} />);
		expect(
			screen.getByText(/no hay sensores disponibles/i)
		).toBeInTheDocument();
	});

	//* Test que muestra mensaje si no hay sensores
	it("muestra mensaje si no hay sensores", () => {
		render(<SensorTable sensors={[]} />);
		expect(
			screen.getByText(/no hay sensores disponibles/i)
		).toBeInTheDocument();
	});

	//* Test que muestra el botón "Nuevo Sensor"
	it("muestra el botón 'Nuevo Sensor'", () => {
		render(<SensorTable sensors={sensors} />);
		expect(
			screen.getByRole("button", { name: /nuevo sensor/i })
		).toBeInTheDocument();
	});

	// Test que muestra los botones de Editar y Eliminar por sensor
	it("muestra botones de Editar y Eliminar por sensor", () => {
		render(<SensorTable sensors={sensors} />);
		expect(screen.getByRole("button", { name: /editar/i })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /eliminar/i })
		).toBeInTheDocument();
	});
});
