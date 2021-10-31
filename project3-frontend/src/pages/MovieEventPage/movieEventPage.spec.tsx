import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieEventPage from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  ADD_USER_TO_EVENT,
  GET_MOVIE_EVENT,
  REMOVE_USER_FROM_EVENT,
} from "../../helpers/graphql-queries";
import { useParams } from "react-router";
import { useAlias } from "../../helpers/alias";

jest.mock("react-router");
jest.mock("../../helpers/alias");
jest.mock("../../helpers/utils", () => {
  const originalModule = jest.requireActual("../../helpers/utils");
  return {
    ...originalModule,
    getEnv: () => "",
  };
});

// Mock query result
const mocks: MockedResponse[] = [
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
  {
    request: {
      query: REMOVE_USER_FROM_EVENT,
      variables: {
        movieEventId: "testId",
        useralias: "testPerson",
      },
    },
    result: {
      data: {
        removeUserFromEvent: {
          userIsParticipant: false,
        },
      },
    },
  },
  {
    request: {
      query: ADD_USER_TO_EVENT,
      variables: {
        movieEventId: "testId",
        useralias: "testPerson",
      },
    },
    result: {
      data: {
        addUserToEvent: {
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

  test("updates correctly when user leaves or joins event", async () => {
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

    // Ensure that the user is joined
    const leaveEventButton = screen.getByText("Leave Event");
    expect(leaveEventButton).toBeInTheDocument();

    // Leave the event
    fireEvent.click(leaveEventButton);

    // Wait for the query to run
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByText("You are not a participant of this event")).toBeInTheDocument();
    const joinEventButton = screen.getByText("Join Event");

    // Join the event again
    fireEvent.click(joinEventButton);

    // Wait for the query to run
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByText("You are a participant of this event")).toBeInTheDocument();
  });
});
