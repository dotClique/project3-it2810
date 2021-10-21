import { gql } from "@apollo/client";

export const ADD_OR_GET_USER = gql`
  mutation CreateUserOrCheckIfExists($alias: String!) {
    createUserOrCheckIfExists(alias: $alias) {
      alias
    }
  }
`;

export const GET_MOVIE_GROUP_NAMES_NOT_FAVORITE = gql`
  query ($alias: String!, $page: Int!, $pageSize: Int!) {
    movieGroupsNotFavorite(alias: $alias, page: $page, pageSize: $pageSize) {
      name
    }
  }
`;

export const GET_COUNT_MOVIE_GROUPS = gql`
  query {
    movieGroupCount
  }
`;

export const CREATE_MOVIE_GROUP = gql`
  mutation ($name: String!, $description: String!) {
    createMovieGroup(name: $name, description: $description) {
      name
      description
    }
  }
`;

export const CREATE_MOVIE_EVENT = gql`
  mutation (
    $title: String!
    $description: String!
    $date: DateTime!
    $location: String!
    $movieGroupId: String!
  ) {
    createMovieEvent(
      title: $title
      description: $description
      date: $date
      location: $location
      movieGroupId: $movieGroupId
    ) {
      title
      date
      movieGroup {
        name
        description
        userFavorites {
          alias
        }
      }
    }
  }
`;
