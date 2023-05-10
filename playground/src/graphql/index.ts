import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

const typeDefs = `#graphql

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query{
    hello: String
    getPerson(name: String!, age: Int!): String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hi world",
    getPerson: (_: any, args: { name: string; age: number }) =>
      `My name is ${args.name} and my age is ${args.age}`,
  },
};

export const useGraphql = async (app: Express) => {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
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
