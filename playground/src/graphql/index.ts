import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { loadFiles } from "@graphql-tools/load-files";

import { resolvers } from "./resolvers";

export const useGraphql = async (app: Express) => {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: await loadFiles("./**/*.graphql"),
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.token,
      }),
    })
  );
};
