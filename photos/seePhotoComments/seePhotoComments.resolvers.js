import client from "../../client";

export default {
  Query: {
    seePhotoComments: async (_, { id, lastId }) =>
      await client.comment.findMany({
        where: {
          photoId: id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
