import { ApolloClient, InMemoryCache } from "@apollo/client";
import { STR_TOKEN } from "./common";

const apollo = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT + "/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem(STR_TOKEN) || "",
  },
});

export default apollo;