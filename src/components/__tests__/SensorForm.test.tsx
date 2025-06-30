import React from "react";
import { render, screen } from "@testing-library/react";
import { SensorForm } from "../SensorForm";
import type { Sensor } from "../../types/Sensor";

//*Mock del hook useSensors
jest.mock("../../hook/useSensor", () => ({
	useSensors: () => ({
		addSensor: jest.fn(),
		updateSensor: jest.fn(),
	}),
}));

//*Test para renderizar el formulario para crear nuevo sensor

describe("SensorForm", () => {
	it("renderiza el formulario para crear nuevo sensor", () => {
		render(<SensorForm isOpen={true} onClose={() => {}} />);

		expect(screen.getByText("Crear Nuevo Sensor")).toBeInTheDocument();
		expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
		expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
		expect(screen.getByLabelText("Valor")).toBeInTheDocument();
		expect(screen.getByLabelText("Activo")).toBeInTheDocument();
		expect(screen.getByText("Cancelar")).toBeInTheDocument();
		expect(screen.getByText("Guardar")).toBeInTheDocument();
	});

	// *Test para renderizar el formulario con datos de un sensor existente
	it("renderiza el formulario con datos del sensor si se pasa uno", () => {
		const mockSensor: Sensor = {
			id: "1",
			name: "Sensor 1",
			type: "Temperatura",
			value: 42,
			status: true,
			updatedAt: "2024-06-30T12:00:00Z",
		};

		render(<SensorForm isOpen={true} onClose={() => {}} sensor={mockSensor} />);

		expect(screen.getByDisplayValue("Sensor 1")).toBeInTheDocument();
		expect(screen.getByDisplayValue("Temperatura")).toBeInTheDocument();
		expect(screen.getByDisplayValue("42")).toBeInTheDocument();
		expect(screen.getByText("Editar Sensor")).toBeInTheDocument();
	});

	//* Test para verificar que los botones Cancelar y Guardar están presentes
	it("muestra los botones Cancelar y Guardar", () => {
		render(<SensorForm isOpen={true} onClose={() => {}} />);

		expect(
			screen.getByRole("button", { name: /cancelar/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /guardar/i })
		).toBeInTheDocument();
	});
});
