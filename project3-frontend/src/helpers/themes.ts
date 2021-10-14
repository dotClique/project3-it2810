import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff9a00",
      contrastText: "#1b1f28",
    },
    secondary: {
      dark: "#10100f",
      main: "#1f1f1e",
      light: "#323231",
      contrastText: "#dedede",
    },
    info: {
      main: "#f1f6f6",
      contrastText: "#3d393e",
    },
    background: {
      default: "#f4fffe",
    },
    success: {
      main: "#00ffff",
      contrastText: "#360345",
    },
  },
});

export default theme;
