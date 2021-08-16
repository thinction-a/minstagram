import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeComment(id: Int!): Comment
  }
`;
