import { ApolloClient, InMemoryCache } from "@apollo/client";
import { STR_TOKEN } from "./common";

const apollo = new ApolloClient({
  uri: "https://api.globetalk.peterkapena.com/graphql",
  // process.env.REACT_APP_GRAPHQL_ENDPOINT +
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem(STR_TOKEN) || "",
  },
});

export default apollo;