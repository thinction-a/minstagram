import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(async (_, { id }) => {
      return id;
    }),
  },
};
