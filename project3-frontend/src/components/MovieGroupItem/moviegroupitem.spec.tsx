import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieGroupItem from "./index";
import { ThemeProvider } from "@mui/material";
import theme from "../../helpers/themes";
import { useHistory } from "react-router";
import { Paths } from "../../helpers/constants";

jest.mock("react-router");

test("Check That MovieGroupItem renders with the correct params and routes", async () => {
  // Mock useHistory for testing
  (useHistory as jest.Mock).mockReturnValue({ push: jest.fn() });

  let clicked = false;
  render(
    <ThemeProvider theme={theme}>
      <MovieGroupItem
        title="testTitle"
        id="testId"
        onToggleFavorite={() => {
          clicked = true;
        }}
        favorite={true}
      />
    </ThemeProvider>,
  );

  const favoriteIcon = screen.getByTestId("solidHeart");
  // Check that the component renders the correct heart
  expect(favoriteIcon).not.toBeNull();

  // Expect the onclick event on the favorite heart to function correctly
  fireEvent.click(favoriteIcon);
  expect(clicked).toBeTruthy();

  // Expect the title to render correctly
  expect(screen.getByTestId("movieGroupTitle").textContent === "testTitle").toBeTruthy();

  // Ensure that the user navigates to the correct page
  const movieGroupLink = screen.getByTestId("movieGroupLink");
  fireEvent.click(movieGroupLink);
  expect(useHistory().push).toHaveBeenCalled();
  expect((useHistory().push as jest.Mock).mock.calls[0][0]).toBe(`${Paths.MOVIE_GROUP}/testId`);
});
