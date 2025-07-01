import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer", () => {
	it("muestra el texto del footer", () => {
		render(<Footer />);
		expect(screen.getByText(/Monitor de Sensores 2025/i)).toBeInTheDocument();
	});
});
