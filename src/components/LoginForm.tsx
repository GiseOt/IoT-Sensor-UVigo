import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	Box,
} from "@mui/material";
import { useAuth } from "../hook/useAuth";
import type { LoginFormInputs } from "../types/loginFormInputs";

export const LoginForm: React.FC = () => {
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>();

	const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
		login(data.email);
	};

	return (
		<Dialog open fullWidth maxWidth="xs">
			<DialogTitle>Inicio de Sesión</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						{...register("email", {
							required: "El email es obligatorio",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Ingresa un email válido",
							},
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						label="Contraseña"
						type="password"
						variant="outlined"
						fullWidth
						margin="normal"
						{...register("password", {
							required: "La contraseña es obligatoria",
							minLength: {
								value: 6,
								message: "La contraseña debe tener al menos 6 caracteres",
							},
						})}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 2 }}
					>
						Iniciar Sesión
					</Button>
					<Box
						sx={{
							mt: 2,
							p: 2,
							bgcolor: "rgba(173, 216, 230, 0.3)",
							borderRadius: 1,
							color: "primary.main",
							fontSize: "0.875rem",
							textAlign: "center",
						}}
					>
						Puedes ingresar cualquier email válido y una contraseña de al menos
						6 caracteres.
					</Box>
				</form>
			</DialogContent>
		</Dialog>
	);
};
