import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import request from "supertest";
import ticketApi from "../api/ticket.api";
import { priceMock, seatMock, sectionMock } from "../mocks/entities.mock";
import { resolvers } from "../resolvers/resolvers";

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

jest.mock("../api/ticket.api")

describe("ApolloServer - e2e", () => {
  let server: ApolloServer, url: string;

  beforeAll(async () => {
    server = await new ApolloServer({
      typeDefs,
      resolvers,
    });

    ({ url } = await startStandaloneServer(server, { listen: { port: 0 } }));
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
