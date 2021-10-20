import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getEnv } from "./utils";

const apiUrl = getEnv("REACT_APP_GRAPHQL_URL");

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

export default client;
