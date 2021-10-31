import React from "react";
import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateMovieEventForm from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";
import { GET_MOVIES, CREATE_MOVIE_EVENT } from "../../helpers/graphql-queries";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import Mock = jest.Mock;

beforeAll(() => {
  const mockGET_MOVIES: MockedResponse = {
    request: {
      query: GET_MOVIES,
      variables: {
        pageSize: 20,
        searchString: "Ter",
      },
    },
    result: {
      data: {
        movies: { primaryTitle: "Terminator" },
      },
    },
  };

  const mockCREATE_MOVIE_EVENT: MockedResponse = {
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
  };
  render(
    <MockedProvider mocks={[mockGET_MOVIES, mockCREATE_MOVIE_EVENT]}>
      <ThemeProvider theme={theme}>
        <CreateMovieEventForm movieGroupId={"asd"}></CreateMovieEventForm>
      </ThemeProvider>
    </MockedProvider>,
  );
});

test("createmovieeventform", async () => {
  userEvent.type(screen.getByLabelText("Title"), "Terminator");
  expect(screen.getByLabelText("Title")).toHaveValue("Terminator");
  userEvent.type(screen.getByTestId("description"), "Terminator2");
  expect(screen.getByTestId("description")).toHaveValue("Terminator2");
  userEvent.type(screen.getByTestId("location"), "Terminator3");
  expect(screen.getByTestId("location")).toHaveValue("Terminator3");
  act(() => {
    fireEvent.change(screen.getByTestId("date"), { target: { value: "1989-11-09T18:53" } });
  });
  expect(screen.getByTestId("date")).toHaveValue("1989-11-09T18:53");
  act(() => {
    screen.getByRole("button").click();
  });
  expect(screen.getByLabelText("Title")).not.toHaveErrorMessage("");
  expect(screen.getByTestId("description")).not.toHaveErrorMessage("");
  expect(screen.getByTestId("location")).not.toHaveErrorMessage("");
  expect(screen.getByTestId("date")).not.toHaveErrorMessage("");
});
