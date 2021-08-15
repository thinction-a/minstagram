import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjects = [];
        if (caption) {
          // parse caption
          hashtagObjects = processHashtags(caption);
          // get or create hashtags
        }
        return await client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObjects.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObjects,
              },
            }),
          },
        });
        // save the photo WITH the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};
