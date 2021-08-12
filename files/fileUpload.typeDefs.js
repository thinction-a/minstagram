import { gql } from "apollo-server-core";

export default gql`
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Query {
    otherFields: Boolean!
  }
  type Mutation {
    singleUpload(file: Upload!): File!
  }
`;
