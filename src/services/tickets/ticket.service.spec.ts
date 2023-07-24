import TicketApiImpl from "../../api/ticket.api";
import TicketApi from "../../api/ticket.api.abstract";
import { priceMock, seatMock, sectionMock, ticketMock } from "../../mocks/entities.mock";
import PriceServiceImpl from "../prices/price.service";
import PriceService from "../prices/price.service.abstract";
import SectionServiceImpl from "../sections/section.service";
import SectionService from "../sections/section.service.abstract";
import TicketServiceImpl from "./ticket.service";
import TicketService from "./ticket.service.abstract";

jest.mock("../../api/ticket.api");

describe("ticketService", () => {

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

  it("should resolve to array of tickets", async () => {
    const packageId = 1919;

    (ticketApi.fetchSeats as jest.Mock).mockResolvedValueOnce([seatMock]);
    (ticketApi.fetchPrices as jest.Mock).mockResolvedValueOnce([priceMock]);
    (ticketApi.fetchSections as jest.Mock).mockResolvedValueOnce([sectionMock]);

    expect(await ticketService.getTickets(packageId)).toEqual([ticketMock]);
  })
});
