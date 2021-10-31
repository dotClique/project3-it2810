import React from "react";
import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateMovieEventForm from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";
import { GET_MOVIES, CREATE_MOVIE_EVENT } from "../../helpers/graphql-queries";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_MOVIES,
      variables: {
        pageSize: 20,
        searchString: "Ter",
      },
    },
    result: {
      data: {
        movies: [{ primarytitle: "Terminator" }, { primarytitle: "Terminator2" }],
      },
    },
  },
  {
    request: {
      query: CREATE_MOVIE_EVENT,
      variables: {
        title: "Terminator",
        description: "Fun movie",
        location: "Berlin",
        date: "1989-11-09T18:53:00.000Z",
        movieGroupId: "asd",
        name: "Terminator",
      },
    },
    result: {
      data: {},
    },
  },
];

beforeEach(async () => {
  // Enter common data for all testing cases
  render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={theme}>
        <CreateMovieEventForm movieGroupId={"asd"}></CreateMovieEventForm>
      </ThemeProvider>
    </MockedProvider>,
  );

  userEvent.type(screen.getByTestId("description"), "Terminator2");
  await waitFor(() => new Promise((res) => setTimeout(res)));
  expect(screen.getByTestId("description")).toHaveValue("Terminator2");
  userEvent.type(screen.getByTestId("location"), "Terminator3");
  await waitFor(() => new Promise((res) => setTimeout(res)));
  expect(screen.getByTestId("location")).toHaveValue("Terminator3");
  fireEvent.change(screen.getByTestId("date"), { target: { value: "1989-11-09T18:53" } });
  await waitFor(() => new Promise((res) => setTimeout(res)));
  expect(screen.getByTestId("date")).toHaveValue("1989-11-09T18:53");
});

describe("test", () => {
  test("no error", async () => {
    // Test the inpu validation
    userEvent.type(screen.getByLabelText("Title"), "Terminator");

    await waitFor(() => new Promise((res) => setTimeout(res)));

    expect(screen.getByLabelText("Title")).toHaveValue("Terminator");
    act(() => {
      screen.getByRole("button").click();
    });
    await waitFor(() => new Promise((res) => setTimeout(res)));
    expect(screen.getByLabelText("Title")).not.toHaveErrorMessage("");
    expect(screen.getByTestId("description")).not.toHaveErrorMessage("");
    expect(screen.getByTestId("location")).not.toHaveErrorMessage("");
    expect(screen.getByTestId("date")).not.toHaveErrorMessage("");
  });

  test("autocomplete", async () => {
    // Test the autocomplete
    userEvent.type(screen.getByLabelText("Title"), "Ter");
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    fireEvent.click(screen.getByTestId("titleInput"));

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    expect(screen.getByText("Terminator")).toBeInTheDocument();
    expect(screen.getByText("Terminator2")).toBeInTheDocument();
  });
});
