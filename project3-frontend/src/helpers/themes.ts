import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f8f6f3",
      contrastText: "#1b1f28",
    },
    secondary: {
      main: "#1f1f1e",
      contrastText: "#dedede",
    },
    info: {
      main: "#f1f6f6",
      contrastText: "#3d393e",
    },
    background: {
      default: "#f4fffe",
    },
  },
});

export default theme;
