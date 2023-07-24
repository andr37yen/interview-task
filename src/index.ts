import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import fs from "fs";
import { resolvers } from "./resolvers/resolvers";
import path from "path";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const typeDefs = fs.readFileSync(
  path.resolve("./src/schema/schema.graphql"),
  { encoding: "utf-8" }
);
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: port },
}).then(({ url }) => {
  console.log(`Server listening at: ${url}`);
});
