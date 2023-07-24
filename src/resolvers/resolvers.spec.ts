import TicketApiImpl from "../api/ticket.api";
import TicketApi from "../api/ticket.api.abstract";
import { ticketMock } from "../mocks/entities.mock";
import PriceServiceImpl from "../services/prices/price.service";
import PriceService from "../services/prices/price.service.abstract";
import SectionServiceImpl from "../services/sections/section.service";
import SectionService from "../services/sections/section.service.abstract";
import TicketServiceImpl from "../services/tickets/ticket.service";
import TicketService from "../services/tickets/ticket.service.abstract";
import { resolvers } from "./resolvers";

jest.mock("../services/tickets/ticket.service")

describe("resolvers", () => {
  
  let ticketApi: TicketApi;
  let ticketService: TicketService;
  let sectionService: SectionService;
  let priceService: PriceService;

  beforeAll(() => {
    ticketApi = new TicketApiImpl("fakedomain");
    sectionService = new SectionServiceImpl(ticketApi);
    priceService = new PriceServiceImpl(ticketApi);
    ticketService = new TicketServiceImpl(ticketApi, sectionService, priceService);
  })

  beforeEach(() => {
    (ticketService.getTickets as jest.Mock).mockClear();
  });

  it("sholud resolve to array of tickets and throw when tickets are not provided", async () => {
    const eventId = 1919;

    (ticketService.getTickets as jest.Mock).mockResolvedValueOnce([ticketMock]);
    expect(await resolvers.Query.tickets(null, { eventId }, { ticketService })).toEqual([
      ticketMock,
    ]);

    (ticketService.getTickets as jest.Mock).mockResolvedValueOnce(null);
    await expect(resolvers.Query.tickets(null, { eventId }, { ticketService })).rejects.toThrow(
      "Failed to get tickets"
    );

    expect((ticketService.getTickets as jest.Mock)).toBeCalledTimes(2);

    expect(true).toBeTruthy();
  });
});
