import client from "../../client";

export default {
  Query: {
    seeComment: async (_, { id }) =>
      client.comment.findUnique({
        where: {
          id,
        },
      }),
  },
};
