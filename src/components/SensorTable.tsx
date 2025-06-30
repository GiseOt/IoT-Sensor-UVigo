import React, { useState, useMemo } from "react";
import { useSensors } from "../hook/useSensor";
import { SensorForm } from "./SensorForm";
import type { Sensor } from "../types/Sensor";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton,
	Paper,
	Typography,
	Box,
	Button,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { statusColors, getSensorValueColor } from "../theme/colors";

type SensorTableProps = {
	sensors: Sensor[];
};
export const SensorTable: React.FC<SensorTableProps> = ({ sensors }) => {
	const { deleteSensor } = useSensors();
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

	const openNewSensorForm = () => {
		setSelectedSensor(null);
		setIsFormOpen(true);
	};

	const openEditSensorForm = (sensor: Sensor) => {
		setSelectedSensor(sensor);
		setIsFormOpen(true);
	};

	const closeForm = () => {
		setIsFormOpen(false);
		setSelectedSensor(null);
	};

	const handleEdit = (sensorId: string) => {
		const sensorToEdit = sensors.find((s) => s.id === sensorId);
		if (sensorToEdit) {
			if (typeof sensorToEdit.value !== "number") {
				sensorToEdit.value = 0;
			}
			openEditSensorForm(sensorToEdit);
		}
	};

	const toggleSortOrder = () => {
		setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
	};

	const sortedSensors = useMemo(() => {
		const sorted = [...sensors].sort((a, b) =>
			sortOrder === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
		);
		return sorted;
	}, [sensors, sortOrder]);

	//*Unidad de Medida Sensores
	const getValueUnit = (tipo: string) => {
		switch (tipo.toLowerCase()) {
			case "temperatura":
				return "°C";
			case "humedad":
				return "%";
			case "presión":
			case "presion":
				return "hPa";
			case "luz":
				return "lux";
			case "movimiento":
				return "";
			default:
				return "";
		}
	};

	return (
		<Paper sx={{ padding: 2, mt: 3 }}>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={2}
			>
				<Typography variant="h6" gutterBottom>
					Sensores en Tiempo Real ({sensors.length} sensor
					{sensors.length !== 1 ? "es" : ""})
				</Typography>
				<Button variant="contained" color="primary" onClick={openNewSensorForm}>
					+ Nuevo Sensor
				</Button>
			</Box>
			<Table>
				<TableHead>
					<TableRow sx={{ backgroundColor: "#f5f5f5" }}>
						<TableCell
							onClick={toggleSortOrder}
							sx={{ fontWeight: "bold", cursor: "pointer" }}
						>
							<Box display="flex" alignItems="center" gap={0.5}>
								ID
								{sortOrder === "asc" ? (
									<ArrowUpwardIcon fontSize="small" />
								) : (
									<ArrowDownwardIcon fontSize="small" />
								)}
							</Box>
						</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Valor</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>
							Última Actualización
						</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sortedSensors.length === 0 ? (
						<TableRow>
							<TableCell colSpan={7} align="center">
								No hay sensores disponibles...
							</TableCell>
						</TableRow>
					) : (
						sortedSensors.map((sensor) => (
							<TableRow key={sensor.id}>
								<TableCell>{sensor.id}</TableCell>
								<TableCell>{sensor.name}</TableCell>
								<TableCell>{sensor.type}</TableCell>
								<TableCell
									sx={{
										color: getSensorValueColor(sensor.type, sensor.value),
										fontWeight: "bold",
									}}
								>
									{(typeof sensor.value === "number"
										? sensor.value
										: Number(sensor.value)
									).toFixed(2)}{" "}
									{getValueUnit(sensor.type)}
								</TableCell>
								<TableCell>
									<Box
										sx={{
											display: "inline-block",
											px: 0.8,
											py: 0.5,
											borderRadius: 2,
											backgroundColor: sensor.status
												? statusColors.activo.bg
												: statusColors.inactivo.bg,
											color: sensor.status
												? statusColors.activo.text
												: statusColors.inactivo.text,

											textAlign: "center",
										}}
									>
										{sensor.status ? "activo" : "inactivo"}
									</Box>
								</TableCell>
								<TableCell>
									{sensor.updatedAt
										? new Date(sensor.updatedAt).toLocaleString()
										: "N/A"}
								</TableCell>
								<TableCell>
									<Box display="flex" gap={1}>
										<IconButton
											aria-label="Editar"
											color="primary"
											onClick={() => handleEdit(sensor.id)}
										>
											<EditOutlinedIcon />
										</IconButton>
										<IconButton
											aria-label="Eliminar"
											color="error"
											onClick={() => deleteSensor(sensor.id)}
										>
											<DeleteOutlineOutlinedIcon />
										</IconButton>
									</Box>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
			{/*-- Formulario--*/}
			<SensorForm
				isOpen={isFormOpen}
				onClose={closeForm}
				sensor={selectedSensor}
			/>
		</Paper>
	);
};
