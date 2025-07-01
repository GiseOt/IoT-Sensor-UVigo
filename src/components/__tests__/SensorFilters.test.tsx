import { render, screen, fireEvent, within } from "@testing-library/react";
import { SensorFilter } from "../SensorFilters";

const mockSearch = jest.fn();
const mockType = jest.fn();
const mockStatus = jest.fn();

beforeEach(() => {
	render(
		<SensorFilter
			searchText=""
			onSearchTextChange={mockSearch}
			typeFilter=""
			onTypeFilterChange={mockType}
			statusFilter=""
			onStatusFilterChange={mockStatus}
		/>
	);
});

//*Test que muestra el campo de búsqueda
it("muestra campo de búsqueda", () => {
	expect(screen.getByLabelText(/buscar por nombre/i)).toBeInTheDocument();
});

//*Test que muestra opciones filtro tipo
it("muestra opciones filtro tipo", async () => {
	fireEvent.mouseDown(screen.getByLabelText(/filtrar por tipo/i));

	expect(screen.getByText(/todos los tipos/i)).toBeInTheDocument();
	expect(screen.getByText(/temperatura/i)).toBeInTheDocument();
	expect(screen.getByText(/presión/i)).toBeInTheDocument();
	expect(screen.getByText(/humedad/i)).toBeInTheDocument();
	expect(screen.getByText(/luz/i)).toBeInTheDocument();
});

//*Test que renderiza el filtro por tipo y sus opciones
it("renderiza el filtro por estado y sus opciones", async () => {
	fireEvent.mouseDown(screen.getByLabelText(/filtrar por estado/i));

	const menu = await screen.findByRole("listbox");

	expect(within(menu).getByText(/todos/i)).toBeInTheDocument();
	expect(within(menu).getAllByText(/activo/i).length).toBeGreaterThan(0);
	expect(within(menu).getAllByText(/inactivo/i).length).toBeGreaterThan(0);
});
