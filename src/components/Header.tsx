import React from "react";
import { useAuth } from "../hook/useAuth";
import { Box, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

export const Header: React.FC = () => {
	const { userEmail, logout } = useAuth();
	return (
		<Box
			component="header"
			sx={{
				bgcolor: "background.paper",
				boxShadow: 1,
				borderBottom: 1,
				borderColor: "divider",
				px: 4,
				py: 2,
				width: "100%",
				position: "sticky",
				top: 0,
				zIndex: 1100,
				marginBottom: 15,
			}}
		>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box>
					<Typography variant="h5" fontWeight="bold" color="text.primary">
						Monitor de Sensores IoT
					</Typography>
					<Typography variant="body2" color="text.secondary" mt={0.5}>
						Datos en tiempo real
					</Typography>
				</Box>

				<Box display="flex" alignItems="center" gap={2}>
					<Box
						display="flex"
						alignItems="center"
						gap={1}
						color="text.secondary"
						fontSize="0.875rem"
					>
						<PersonIcon fontSize="small" />
						<Typography>{userEmail}</Typography>
					</Box>
					<Button
						variant="outlined"
						size="small"
						onClick={logout}
						startIcon={<LogoutIcon />}
					>
						Cerrar Sesión
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
