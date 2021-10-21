import { gql } from "@apollo/client";

export const ADD_OR_GET_USER = gql`
  mutation CreateUserOrCheckIfExists($alias: String!) {
    createUserOrCheckIfExists(alias: $alias) {
      alias
    }
  }
`;

export const GET_MOVIE_GROUP_NAMES = gql`
  query {
    movieGroups {
      name
    }
  }
`;
