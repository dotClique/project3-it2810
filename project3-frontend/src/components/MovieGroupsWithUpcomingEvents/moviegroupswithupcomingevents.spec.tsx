import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieGroupWithUpcomingEvents from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";
import { useHistory } from "react-router";
import { Paths } from "../../helpers/constants";

jest.mock("react-router");

describe("Check That MovieGroupWithUpcomingEvents", () => {
  test("renders correctly", async () => {
    let clicked = false;
    render(
      <ThemeProvider theme={theme}>
        <MovieGroupWithUpcomingEvents
          title="testTitle"
          id="testId"
          onUnFavorite={() => {
            clicked = true;
          }}
          events={[
            { title: "test1", date: "2025-09-21T00:00:00.000Z", movieEventId: "testId1" },
            { title: "test2", date: "2025-09-21T00:00:00.000Z", movieEventId: "testId2" },
          ]}
        />
      </ThemeProvider>,
    );

    const favoriteIcon = screen.getByTestId("solidHeart");
    // Check that the component renders the correct heart
    expect(favoriteIcon).not.toBeNull();

    // Expect the onclick event on the favorite heart to function correctly
    fireEvent.click(favoriteIcon);
    expect(clicked).toBeTruthy();

    // Expect the events to render correctly
    expect(screen.getAllByText("test1")).toBeTruthy();
    expect(screen.getAllByText("test2")).toBeTruthy();
  });

  test("routes correctly", async () => {
    // Mock useHistory for testing
    (useHistory as jest.Mock).mockReturnValue({ push: jest.fn() });
    render(
      <ThemeProvider theme={theme}>
        <MovieGroupWithUpcomingEvents
          title="testTitle"
          id="testId"
          onUnFavorite={() => {}}
          events={[{ title: "test1", date: "2025-09-21T00:00:00.000Z", movieEventId: "testId1" }]}
        />
      </ThemeProvider>,
    );

    // Ensure that the user navigates to the correct page
    const movieGroupLink = screen.getByTestId("movieGroupWithUpcomingEvents");
    fireEvent.click(movieGroupLink);
    expect(useHistory().push).toHaveBeenCalled();
    expect((useHistory().push as jest.Mock).mock.calls[0][0]).toBe(`${Paths.MOVIE_GROUP}/testId`);

    const movieEventLink = screen.getByText("test1");
    fireEvent.click(movieEventLink);
    expect(useHistory().push).toBeCalledTimes(2);
    expect((useHistory().push as jest.Mock).mock.calls[1][0]).toBe(`${Paths.MOVIE_EVENT}/testId1`);
  });
});
