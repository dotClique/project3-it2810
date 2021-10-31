import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FavoriteIcon } from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";

test("Check if favorite icon renders filled version", async () => {
  render(
    <ThemeProvider theme={theme}>
      <FavoriteIcon width={20} isFilled={true} />
    </ThemeProvider>,
  );

  expect(screen.getByTestId("solidHeart")).toBeInTheDocument();
  expect(screen.queryByTestId("outlinedHeart")).toBeNull();
});

test("Check if favorite icon renders outlined version", async () => {
  render(
    <ThemeProvider theme={theme}>
      <FavoriteIcon width={20} isFilled={false} />
    </ThemeProvider>,
  );

  expect(screen.getByTestId("outlinedHeart")).toBeInTheDocument();
  expect(screen.queryByTestId("solidHeart")).toBeNull();
});
