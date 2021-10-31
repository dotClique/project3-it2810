import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieEventTextItem from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";

test("test eventtextitem value", async () => {
  render(
    <ThemeProvider theme={theme}>
      <MovieEventTextItem title={"testtittel"} body={"testkropp"} />
    </ThemeProvider>,
  );
  expect(screen.getByTestId("title")).toHaveTextContent("testtittel");
  expect(screen.getByTestId("body")).toHaveTextContent("testkropp");
});
