import React, { useState, useMemo } from "react";
import { SensorFilter } from "./SensorFilters";
import { SensorTable } from "./SensorTable";
import { useSensors } from "../hook/useSensor";
import { Typography } from "@mui/material";

export const Dashboard = () => {
	const { sensors } = useSensors();
	const [searchText, setSearchText] = useState("");
	const [typeFilter, setTypeFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");

	//*Filtrar
	const filteredSensors = useMemo(() => {
		return sensors.filter((sensor) => {
			return (
				sensor.name.toLowerCase().includes(searchText.toLowerCase()) &&
				(typeFilter === "" || sensor.type === typeFilter) &&
				(statusFilter === "" ||
					(statusFilter === "activo" ? sensor.status : !sensor.status))
			);
		});
	}, [sensors, searchText, typeFilter, statusFilter]);

	return (
		<main
			style={{
				maxWidth: 1280,
				margin: "0 auto",
				padding: 4,
			}}
		>
			<Typography variant="h6" gutterBottom>
				Gestión de Sensores ({sensors.length})
			</Typography>
			<SensorFilter
				searchText={searchText}
				onSearchTextChange={setSearchText}
				typeFilter={typeFilter}
				onTypeFilterChange={setTypeFilter}
				statusFilter={statusFilter}
				onStatusFilterChange={setStatusFilter}
			/>
			<SensorTable sensors={filteredSensors} />
		</main>
	);
};
