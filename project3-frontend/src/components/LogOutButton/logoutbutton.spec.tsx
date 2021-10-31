import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LogOutButton } from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";

test("Check logoutbutton runs the onclick event", async () => {
  let clicked = false;
  render(
    <ThemeProvider theme={theme}>
      <LogOutButton
        onClick={() => {
          clicked = true;
        }}
      >
        Log out
      </LogOutButton>
    </ThemeProvider>,
  );

  const logOutButton = screen.getByText("Log out");
  expect(logOutButton).not.toBeNull();
  fireEvent.click(logOutButton);
  expect(clicked).toBeTruthy();
});
