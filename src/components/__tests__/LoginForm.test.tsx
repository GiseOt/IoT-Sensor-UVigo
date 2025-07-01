import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../LoginForm";

jest.mock("../../hook/useAuth", () => ({
	useAuth: () => ({
		login: jest.fn(),
	}),
}));

describe("LoginForm", () => {
	// Test que renderiza los campos y el botón del formulario de inicio de sesión
	it("renderiza los campos y el botón", () => {
		render(<LoginForm />);
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /iniciar sesión/i })
		).toBeInTheDocument();
	});

	//*Test que muestra el título 'Iniciar Sesión

	it("muestra el título Inicio de Sesión", () => {
		render(<LoginForm />);
		expect(screen.getByText(/inicio de sesión/i)).toBeInTheDocument();
	});

	//* Test que muestra el mensaje informativo
	it("muestra el mensaje informativo", () => {
		render(<LoginForm />);
		expect(
			screen.getByText(
				/puedes ingresar cualquier email válido y una contraseña de al menos 6 caracteres/i
			)
		).toBeInTheDocument();
	});

	//*Test que muestra errores si los campos están vacíos al enviar
	it("muestra errores si los campos están vacíos al enviar", async () => {
		render(<LoginForm />);
		fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

		await waitFor(() => {
			expect(screen.getByText(/el email es obligatorio/i)).toBeInTheDocument();
			expect(
				screen.getByText(/la contraseña es obligatoria/i)
			).toBeInTheDocument();
		});
	});
});
