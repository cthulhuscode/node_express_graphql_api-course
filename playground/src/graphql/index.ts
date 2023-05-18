import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { loadFiles } from "@graphql-tools/load-files";
import { buildContext } from "graphql-passport";
import {
  typeDefs as scalarsTypeDefs,
  resolvers as scalarsResolvers,
} from "graphql-scalars";

import { resolvers } from "./resolvers";

export const useGraphql = async (app: Express) => {
  const httpServer = http.createServer(app);
  // Add other GraphQL scalars to extend the types used in models
  const typeDefs = [...(await loadFiles("./**/*.graphql")), scalarsTypeDefs];
  const allResolvers = [resolvers, scalarsResolvers];

  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  );
};
