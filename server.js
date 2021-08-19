require("dotenv").config();
import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";
// import pubsub from "./pubsub";
import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

// console.log(pubsub);

const PORT = process.env.PORT;
const app = express();
const httpServer = createServer(app);
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      if (req) {
        return {
          loggedInUser: await getUser(req.headers.authorization),
          protectResolver,
        };
      }
    },
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async ({ Authorization }) => {
        if (!Authorization) {
          throw new Error("You can't listen.");
        }
        const loggedInUser = await getUser(Authorization);
        return {
          loggedInUser,
        };
      },
    },
    { server: httpServer, path: server.graphqlPath }
  );

  await new Promise((r) => httpServer.listen({ port: PORT }, r)).then(() => {
    console.log(
      `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath}/ ✅`
    );
    console.log(
      `🚀 Subscription Server is running on ws://localhost:${PORT}${server.graphqlPath}/ ✅`
    );
  });
};

startServer();
