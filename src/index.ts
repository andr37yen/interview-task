import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { resolvers } from "./schema/resolvers";
import { typeDefs } from "./schema/type-defs";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: port },
}).then(({ url }) => {
  console.log(`Server listening at: ${url}`);
});
