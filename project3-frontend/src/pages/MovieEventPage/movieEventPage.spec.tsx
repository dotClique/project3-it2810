import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieEventPage from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";
import { MockedProvider } from "@apollo/client/testing";
import { GET_MOVIE_EVENT } from "../../helpers/graphql-queries";
import { useParams } from "react-router";
import { useAlias } from "../../helpers/alias";

jest.mock("react-router");
jest.mock("../../helpers/alias");

// Mock query result
const mocks = [
  {
    request: {
      query: GET_MOVIE_EVENT,
      variables: {
        movieEventId: "testId",
        alias: "testPerson",
      },
    },
    result: {
      data: {
        movieEvent: {
          title: "testTitle",
          date: "2025-09-21T00:00:00.000",
          description: "testDescription",
          location: "testLocation",
          userIsParticipant: true,
        },
      },
    },
  },
];

describe("Check That movieEventPage", () => {
  test("renders correctly", async () => {
    // Mock the url id
    (useParams as jest.Mock).mockReturnValue({
      id: "testId",
    });

    // Mock the locally stored user alias
    (useAlias as jest.Mock).mockReturnValue({
      alias: "testPerson",
    });

    render(
      <MockedProvider mocks={mocks}>
        <ThemeProvider theme={theme}>
          <MovieEventPage />
        </ThemeProvider>
      </MockedProvider>,
    );

    // Wait for the query to run
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByText("testTitle")).toBeInTheDocument();
    expect(screen.getByText("testDescription")).toBeInTheDocument();
    // Expect the date to be correctly formatted
    expect(screen.getByText("2025-09-21 00:00:00")).toBeInTheDocument();
    expect(screen.getByText("testLocation")).toBeInTheDocument();
    expect(screen.getByText("You are a participant of this event")).toBeInTheDocument();
    expect(screen.getByText("Leave Event")).toBeInTheDocument();
  });
});
