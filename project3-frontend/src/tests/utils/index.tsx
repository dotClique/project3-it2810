import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import renderer from "react-test-renderer";
import theme from "../../helpers/themes";

export const createSnapshot = (Component: ReactNode) => {
  return renderer.create(<ThemeProvider theme={theme}>{Component}</ThemeProvider>).toJSON();
};
