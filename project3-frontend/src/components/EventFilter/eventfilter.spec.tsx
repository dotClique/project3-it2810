import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventFilter from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";
import userEvent from "@testing-library/user-event";

//tests whether setToDate and setFromDate are called by Eventfilter when value of the selectfield is changed
test("test eventfilter date", async () => {
  const setSearchString = jest.fn();
  const setToDate = jest.fn();
  const setFromDate = jest.fn();

  render(
    <ThemeProvider theme={theme}>
      <EventFilter
        setSearchString={setSearchString}
        setToDate={setToDate}
        setFromDate={setFromDate}
      />
    </ThemeProvider>,
  );
  await waitFor(() => new Promise((res) => setTimeout(res)));
  act(() => {
    fireEvent.change(screen.getByTestId("timeperiod"), {
      target: { value: "2" },
    });
  });
  expect(setToDate).toBeCalled();
  expect(setFromDate).toBeCalled();
});

//tests whether setSearchString is called by EventFilter when something is typed
test("test eventfilter search", async () => {
  const setSearchString = jest.fn();
  const setToDate = jest.fn();
  const setFromDate = jest.fn();

  render(
    <ThemeProvider theme={theme}>
      <EventFilter
        setSearchString={setSearchString}
        setToDate={setToDate}
        setFromDate={setFromDate}
      />
    </ThemeProvider>,
  );
  userEvent.type(screen.getByTestId("textinput"), "termin");
  expect(setSearchString).toBeCalled();
});
