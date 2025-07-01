import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

// Mock del hook useAuth
jest.mock("../../hook/useAuth", () => ({
	useAuth: () => ({
		userEmail: "usuario@ejemplo.com",
		logout: jest.fn(),
	}),
}));

//*Test que muestra el título y el subtítulo
describe("Header", () => {
	it("muestra el título y el subtítulo", () => {
		render(<Header />);
		expect(screen.getByText(/monitor de sensores iot/i)).toBeInTheDocument();
		expect(screen.getByText(/datos en tiempo real/i)).toBeInTheDocument();
	});

	//* Test que muestra el email del usuario
	it("muestra el email del usuario", () => {
		render(<Header />);
		expect(screen.getByText("usuario@ejemplo.com")).toBeInTheDocument();
	});
	// Test que muestra el botón de cerrar sesión
	it("muestra el botón de cerrar sesión", () => {
		render(<Header />);
		expect(
			screen.getByRole("button", { name: /cerrar sesión/i })
		).toBeInTheDocument();
	});
});
