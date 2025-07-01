import { green, red, blue, orange, grey } from "@mui/material/colors";

//*Estados de los sensores
export const statusColors = {
	activo: {
		bg: green[100],
		text: green[800],
	},
	inactivo: {
		bg: red[100],
		text: red[800],
	},
};

// *Tipo de sensores
export const getSensorValueColor = (type: string, value: number): string => {
	switch (type.toLowerCase()) {
		case "temperatura":
			if (value > 30) return red[600];
			if (value < 15) return blue[600];
			return green[600];
		case "humedad":
			if (value > 70) return blue[600];
			if (value < 30) return orange[600];
			return green[600];

		case "presión":
			if (value > 100) return red[600];
			if (value < 90) return blue[600];
			return blue[600];
		case "luz":
			if (value > 1000) return blue[900];
			if (value < 100) return blue[200];
			return blue[500];
		default:
			return grey[700];
	}
};
