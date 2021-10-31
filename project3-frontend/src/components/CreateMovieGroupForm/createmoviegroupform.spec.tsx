import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateMovieGroupForm from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  render(
    <MockedProvider>
      <ThemeProvider theme={theme}>
        <CreateMovieGroupForm />
      </ThemeProvider>
    </MockedProvider>,
  );
});

test("Createmoviegroup test", async () => {
  userEvent.type(screen.getByTestId("name"), "Terminator");
  expect(screen.getByTestId("name")).toHaveValue("Terminator");
  userEvent.type(screen.getByTestId("description"), "Terminator2");
  expect(screen.getByTestId("description")).toHaveValue("Terminator2");

  expect(screen.getByTestId("name")).not.toHaveErrorMessage("");
  expect(screen.getByTestId("name")).not.toHaveErrorMessage("");
});
