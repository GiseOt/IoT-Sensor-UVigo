import React, { useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Switch,
	FormControlLabel,
	Button,
	FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { Sensor } from "../types/Sensor";
import { useSensors } from "../hook/useSensor";

interface SensorFormProps {
	isOpen: boolean;
	onClose: () => void;
	sensor?: Sensor | null;
}

const SENSOR_TYPES: Sensor["type"][] = [
	"Temperatura",
	"Presión",
	"Humedad",
	"Luz",
];

export const SensorForm: React.FC<SensorFormProps> = ({
	isOpen,
	onClose,
	sensor,
}) => {
	const { addSensor, updateSensor } = useSensors();

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<Omit<Sensor, "id" | "updatedAt">>({
		defaultValues: {
			name: "",
			type: "" as Sensor["type"],
			value: 0,
			status: true,
		},
	});

	useEffect(() => {
		if (sensor) {
			reset({
				name: sensor.name,
				type: sensor.type,
				value: sensor.value,
				status: sensor.status,
			});
		} else {
			reset({
				name: "",
				type: "" as Sensor["type"],
				value: 0,
				status: true,
			});
		}
	}, [sensor, reset]);

	const onSubmit = (data: Omit<Sensor, "id" | "updatedAt">) => {
		const payload = {
			...data,
			id: sensor?.id ?? "",
			value: Number(data.value),
			updatedAt: new Date().toISOString(),
		};

		if (sensor) {
			updateSensor(payload);
		} else {
			addSensor(payload);
		}

		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogTitle>
				{sensor ? "Editar Sensor" : "Crear Nuevo Sensor"}
			</DialogTitle>
			<DialogContent>
				<form id="sensor-form" onSubmit={handleSubmit(onSubmit)} noValidate>
					<Controller
						name="name"
						control={control}
						rules={{ required: "El nombre es requerido" }}
						render={({ field }) => (
							<TextField
								{...field}
								label="Nombre"
								fullWidth
								margin="normal"
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						)}
					/>

					<FormControl fullWidth margin="normal" error={!!errors.type}>
						<InputLabel id="type-label">Tipo</InputLabel>
						<Controller
							name="type"
							control={control}
							rules={{ required: "El tipo es requerido" }}
							render={({ field }) => (
								<Select {...field} labelId="type-label" label="Tipo">
									{SENSOR_TYPES.map((type) => (
										<MenuItem key={type} value={type}>
											{type}
										</MenuItem>
									))}
								</Select>
							)}
						/>
						<FormHelperText>{errors.type?.message}</FormHelperText>
					</FormControl>

					<Controller
						name="value"
						control={control}
						rules={{
							required: "El valor tiene que ser un número",
							validate: (v) => {
								const number = Number(v);
								return !isNaN(number) && number >= 0;
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label="Valor"
								fullWidth
								margin="normal"
								type="number"
								inputProps={{ step: "0.01" }}
								error={!!errors.value}
								helperText={errors.value?.message}
							/>
						)}
					/>

					<Controller
						name="status"
						control={control}
						render={({ field }) => (
							<FormControlLabel
								control={
									<Switch
										checked={field.value}
										onChange={(e) => field.onChange(e.target.checked)}
									/>
								}
								label="Activo"
							/>
						)}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancelar</Button>
				<Button type="submit" form="sensor-form" variant="contained">
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	);
};
