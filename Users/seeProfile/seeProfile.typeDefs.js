import { gql } from "apollo-server";

export default gql`
  type Query {
    seeProfile(username: String, id: Int): User
  }
`;
