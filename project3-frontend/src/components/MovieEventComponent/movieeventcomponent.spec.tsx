import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieEventComponent from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";

test("load and display movieevent", async () => {
  render(
    <ThemeProvider theme={theme}>
      <MovieEventComponent
        description={"hoi"}
        title={"hai"}
        location={"vladivostok"}
        datetime={"1345-08-21T03:44:22.123Z"}
        isParticipant={true}
      />
    </ThemeProvider>,
  );
  expect(screen.getByTestId("eventdatetime")).toHaveTextContent("1345-08-21 03:44:22");
});
