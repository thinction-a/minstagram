import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver(
      async (_, { lastId }, { loggedInUser }) =>
        await client.photo.findMany({
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
              },
              { userId: loggedInUser.id },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        })
    ),
  },
};
