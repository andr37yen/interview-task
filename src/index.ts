import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import fs from "fs";
import { resolvers } from "./resolvers/resolvers";
import path from "path";
import { IServerContext } from "./types/IServerContext.types";
import TicketApiImpl from "./api/ticket.api";
import TicketServiceImpl from "./services/tickets/ticket.service";
import SectionServiceImpl from "./services/sections/section.service";
import PriceServiceImpl from "./services/prices/price.service";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const domain = process.env.DOMAIN || "https://my.laphil.com"
const typeDefs = fs.readFileSync(path.resolve("./src/schema/schema.graphql"), {
  encoding: "utf-8",
});
const server = new ApolloServer<IServerContext>({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port },
  context: () => {
    const ticketApi = new TicketApiImpl(domain);
    const ticketService = new TicketServiceImpl(
      ticketApi,
      new SectionServiceImpl(ticketApi),
      new PriceServiceImpl(ticketApi)
    );

    return Promise.resolve({
      ticketService,
    });
  },
}).then(({ url }) => {
  console.log(`Server listening at: ${url}`);
});
