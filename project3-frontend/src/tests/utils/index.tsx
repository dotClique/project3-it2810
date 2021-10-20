import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import renderer from "react-test-renderer";
import theme from "../../helpers/themes";

/**
 * A function to handle the creation of snapshots.
 * This function has to wrap the component in a MUI ThemeProvider such that each component
 * is able to use the custum mui theme.
 * @param Component
 * @returns
 */
export const createSnapshot = (Component: ReactNode) => {
  return renderer.create(<ThemeProvider theme={theme}>{Component}</ThemeProvider>).toJSON();
};
