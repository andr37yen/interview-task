import { ticketMock } from "../mocks/entities.mock";
import ticketService from "../services/tickets/ticket.service";
import { resolvers } from "./resolvers";

jest.mock("../services/tickets/ticket.service")

describe("resolvers", () => {
  beforeEach(() => {
    (ticketService.getTickets as jest.Mock).mockClear();
  });

  it("sholud resolve to array of tickets and throw when tickets are not provided", async () => {
    const eventId = 1919;

    (ticketService.getTickets as jest.Mock).mockResolvedValueOnce([ticketMock]);
    expect(await resolvers.Query.tickets(null, { eventId })).toEqual([
      ticketMock,
    ]);

    (ticketService.getTickets as jest.Mock).mockResolvedValueOnce(null);
    await expect(resolvers.Query.tickets(null, { eventId })).rejects.toThrow(
      "Failed to get tickets"
    );

    expect((ticketService.getTickets as jest.Mock)).toBeCalledTimes(2);

    expect(true).toBeTruthy();
  });
});
