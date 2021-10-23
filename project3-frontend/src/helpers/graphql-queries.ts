import { gql } from "@apollo/client";

export const ADD_OR_GET_USER = gql`
  mutation CreateUserOrCheckIfExists($alias: String!) {
    createUserOrCheckIfExists(alias: $alias) {
      alias
    }
  }
`;

export const GET_MOVIE_GROUPS_FAVORITE = gql`
  query ($alias: String!, $page: Int!, $pageSize: Int!) {
    movieGroups(aliasFavoriteUser: $alias, page: $page, pageSize: $pageSize) {
      movieGroupId
      name
      movieEvents {
        title
        date
        movieEventId
      }
    }
  }
`;

export const GET_MOVIE_GROUPS = gql`
  query ($page: Int!, $pageSize: Int!) {
    movieGroups(page: $page, pageSize: $pageSize) {
      movieGroupId
      name
      userFavorites {
        alias
      }
    }
  }
`;

export const GET_COUNT_MOVIE_GROUPS_FAVORITE = gql`
  query ($alias: String!) {
    movieGroupCount(aliasFavoriteUser: $alias)
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

export const ADD_USER_TO_MOVIE_GROUP = gql`
  mutation ($movieGroupId: String!, $useralias: String!) {
    addUserToMovieGroup(movieGroupId: $movieGroupId, useralias: $useralias) {
      name
      userFavorites {
        alias
      }
    }
  }
`;

export const REMOVE_USER_FROM_MOVIE_GROUP = gql`
  mutation ($movieGroupId: String!, $useralias: String!) {
    removeUserFromMovieGroup(movieGroupId: $movieGroupId, useralias: $useralias) {
      name
      userFavorites {
        alias
      }
    }
  }
`;
