import React from "react";
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	Paper,
} from "@mui/material";
import type { Sensor } from "../types/Sensor";
import type { SensorFilterProps } from "../types/sensorFilterProps";

const SENSOR_TYPES: Sensor["type"][] = [
	"Temperatura",
	"Presión",
	"Humedad",
	"Luz",
];

export const SensorFilter: React.FC<SensorFilterProps> = ({
	searchText,
	onSearchTextChange,
	typeFilter,
	onTypeFilterChange,
	statusFilter,
	onStatusFilterChange,
}) => {
	return (
		<Paper sx={{ p: 2, mb: 3 }}>
			<Grid container spacing={2} alignItems="center" justifyContent="center">
				<Grid item xs={12} md={4}>
					<TextField
						fullWidth
						label="Buscar por nombre"
						value={searchText}
						onChange={(e) => onSearchTextChange(e.target.value)}
						variant="outlined"
						placeholder="Ejemplo: humedad"
						inputProps={{ style: { minWidth: "250px" } }}
					/>
				</Grid>

				<Grid item xs={12} md={4}>
					<FormControl fullWidth variant="outlined">
						<InputLabel id="type-filter-label">Filtrar por Tipo</InputLabel>
						<Select
							labelId="type-filter-label"
							value={typeFilter}
							onChange={(e) => onTypeFilterChange(e.target.value)}
							label="Filtrar por Tipo"
							sx={{ minWidth: "250px" }}
						>
							<MenuItem value="">Todos los tipos</MenuItem>
							{SENSOR_TYPES.map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={4}>
					<FormControl fullWidth variant="outlined">
						<InputLabel id="status-filter-label">Filtrar por Estado</InputLabel>
						<Select
							labelId="status-filter-label"
							value={statusFilter}
							onChange={(e) => onStatusFilterChange(e.target.value)}
							label="Filtrar por Estado"
							sx={{ minWidth: "250px" }}
						>
							<MenuItem value="">Todos</MenuItem>
							<MenuItem value="activo">Activo</MenuItem>
							<MenuItem value="inactivo">Inactivo</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</Paper>
	);
};
