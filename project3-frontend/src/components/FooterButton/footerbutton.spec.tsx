import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FooterButton from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";

test("Check if favorite icon renders filled version", async () => {
  let clicked = false;
  render(
    <ThemeProvider theme={theme}>
      <FooterButton
        onClick={() => {
          clicked = true;
        }}
        text={"testText"}
      />
    </ThemeProvider>,
  );

  // Check if text is correctly shown
  expect(screen.getByText("testText")).toBeInTheDocument();

  // Check if onclick works correctly
  fireEvent.click(screen.getByText("testText"));
  expect(clicked).toBeTruthy();
});
