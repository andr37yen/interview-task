import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import request from "supertest";
import TicketApiImpl from "../api/ticket.api";
import TicketApi from "../api/ticket.api.abstract";
import { priceMock, seatMock, sectionMock } from "../mocks/entities.mock";
import { resolvers } from "../resolvers/resolvers";
import PriceServiceImpl from "../services/prices/price.service";
import PriceService from "../services/prices/price.service.abstract";
import SectionServiceImpl from "../services/sections/section.service";
import SectionService from "../services/sections/section.service.abstract";
import TicketServiceImpl from "../services/tickets/ticket.service";
import TicketService from "../services/tickets/ticket.service.abstract";
import { IServerContext } from "../types/IServerContext.types";

const typeDefs = readFileSync("./src/schema/schema.graphql", {
  encoding: "utf-8",
});

const queryData = {
  query: `
  query ExampleQuery($eventId: Int) {
    tickets(eventId: $eventId) {
      Price
      SeatNumber
      SeatRow
      Section {
        AdditionalText
        AdditionalText2
        Description
        PrintDesc
        SectionLegend
      }
    }
  }
  `,
  variables: { eventId: 1919 },
};

jest.mock("../api/ticket.api");

describe("ApolloServer - e2e", () => {
  let server: ApolloServer<IServerContext>, url: string;
  let ticketApi: TicketApi;
  let ticketService: TicketService;
  let sectionService: SectionService;
  let priceService: PriceService;

  beforeAll(async () => {
    ticketApi = new TicketApiImpl("fakedomain");
    sectionService = new SectionServiceImpl(ticketApi);
    priceService = new PriceServiceImpl(ticketApi);
    ticketService = new TicketServiceImpl(
      ticketApi,
      sectionService,
      priceService
    );

    server = await new ApolloServer<IServerContext>({
      typeDefs,
      resolvers,
    });

    ({ url } = await startStandaloneServer(server, {
      listen: { port: 0 },
      context: () =>
        Promise.resolve({
          ticketService,
        }),
    }));
  });

  afterAll(async () => {
    await server?.stop();
  });

  it("should return data if request is successfull and erros otherwise", async () => {
    (ticketApi.fetchSeats as jest.Mock).mockResolvedValueOnce([seatMock]);
    (ticketApi.fetchPrices as jest.Mock).mockResolvedValueOnce([priceMock]);
    (ticketApi.fetchSections as jest.Mock).mockResolvedValueOnce([sectionMock]);

    let response = await request(url).post("/").send(queryData);

    expect(response.body.data.tickets).toBeDefined();

    (ticketApi.fetchSeats as jest.Mock).mockRejectedValueOnce({});
    (ticketApi.fetchPrices as jest.Mock).mockRejectedValueOnce({});
    (ticketApi.fetchSections as jest.Mock).mockRejectedValueOnce({});

    response = await request(url).post("/").send(queryData);

    expect(response.body.errors).toBeDefined();
  });
});
