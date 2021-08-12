import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const following = await client.user
        .findUnique({
          where: { username },
        })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...client(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
