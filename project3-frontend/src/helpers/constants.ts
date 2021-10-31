export enum PathsWithParams {
  HOME = "/",
  MOVIE_GROUP = "/group/:id",
  MOVIE_GROUPS = "/groups",
  FAVORITE_GROUPS = "/favorite-groups",
  ADD_MOVIE_GROUP = "/add-movie-group",
  MOVIE_EVENT = "/movie/:id",
  ADD_MOVIE_EVENT = "/addmovie/:id",
}

// For use when routing
export enum Paths {
  HOME = "/",
  MOVIE_GROUP = "/group",
  MOVIE_GROUPS = "/groups",
  FAVORITE_GROUPS = "/favorite-groups",
  ADD_MOVIE_GROUP = "/add-movie-group",
  MOVIE_EVENT = "/movie",
  ADD_MOVIE_EVENT = "/addmovie",
}

export const PUBLIC_URL = process.env.PUBLIC_URL;
