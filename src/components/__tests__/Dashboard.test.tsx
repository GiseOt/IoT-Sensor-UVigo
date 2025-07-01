import React from "react";
import {
	render,
	screen,
	fireEvent,
	waitFor,
	within,
} from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Dashboard } from "../Dashboard";

// Mock del hook useSensor
jest.mock("../../hook/useSensor", () => ({
	useSensors: () => ({
		sensors: [
			{
				id: "1",
				name: "Sensor Uno",
				type: "Temperatura",
				value: 10,
				status: true,
				updatedAt: "2024-06-30T12:00:00Z",
			},
			{
				id: "2",
				name: "Sensor Dos",
				type: "Humedad",
				value: 20,
				status: false,
				updatedAt: "2024-06-30T12:00:00Z",
			},
			{
				id: "3",
				name: "Sensor Tres",
				type: "Temperatura",
				value: 15,
				status: true,
				updatedAt: "2024-06-30T12:00:00Z",
			},
		],
	}),
}));

// Helper para renderizar con ThemeProvider
const renderWithTheme = (ui: React.ReactElement) => {
	return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);
};

describe("Dashboard", () => {
	//*Test que muestra el título principal
	it("renderiza el título principal", () => {
		renderWithTheme(<Dashboard />);
		expect(screen.getByText(/gestión de sensores/i)).toBeInTheDocument();
	});

	// Test muestra componentes hijos: filtros y tabla con sensores
	it("renderiza componentes hijos: filtros y tabla con sensores", () => {
		renderWithTheme(<Dashboard />);
		expect(
			screen.getByRole("textbox", { name: /buscar por nombre/i })
		).toBeInTheDocument();
		expect(screen.getByText(/sensor uno/i)).toBeInTheDocument();
		expect(screen.getByText(/sensor dos/i)).toBeInTheDocument();
		expect(screen.getByText(/sensor tres/i)).toBeInTheDocument();
	});

	// Test que filtra sensores por nombre
	it("filtra sensores por nombre", async () => {
		renderWithTheme(<Dashboard />);
		const input = screen.getByRole("textbox", { name: /buscar por nombre/i });
		fireEvent.change(input, { target: { value: "Uno" } });

		await waitFor(() => {
			expect(screen.getByText(/sensor uno/i)).toBeInTheDocument();
			expect(screen.queryByText(/sensor dos/i)).not.toBeInTheDocument();
			expect(screen.queryByText(/sensor tres/i)).not.toBeInTheDocument();
		});
	});

	// Test que filtra sensores por tipo
	it("filtra sensores por tipo", async () => {
		renderWithTheme(<Dashboard />);

		// Abrir el select de tipo
		const selectTipo = screen.getByLabelText(/filtrar por tipo/i);
		fireEvent.mouseDown(selectTipo);

		const menu = await screen.findByRole("listbox");

		const optionTemperatura = within(menu).getByText(/temperatura/i);
		fireEvent.click(optionTemperatura);

		await waitFor(() => {
			expect(screen.getByText(/sensor uno/i)).toBeInTheDocument();
			expect(screen.queryByText(/sensor dos/i)).not.toBeInTheDocument();
			expect(screen.getByText(/sensor tres/i)).toBeInTheDocument();
		});
	});

	// Test que filtra sensores por estado (activo/inactivo)
	it("filtra sensores por estado", async () => {
		renderWithTheme(<Dashboard />);

		const selectEstado = screen.getByLabelText(/filtrar por estado/i);
		fireEvent.mouseDown(selectEstado);

		const menu = await screen.findByRole("listbox");
		const optionActivo = within(menu).getByRole("option", { name: "Activo" });
		fireEvent.click(optionActivo);

		await waitFor(() => {
			expect(screen.getByText(/sensor uno/i)).toBeInTheDocument();
			expect(screen.queryByText(/sensor dos/i)).not.toBeInTheDocument();
			expect(screen.getByText(/sensor tres/i)).toBeInTheDocument();
		});
	});
});
