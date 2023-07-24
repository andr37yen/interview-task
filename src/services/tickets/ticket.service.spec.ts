import { priceMock, seatMock, sectionMock, ticketMock } from "../../mocks/entities.mock";
import ticketApi from "../../api/ticket.api";
import ticketService from "./ticket.service";
import priceService from "../prices/price.service";
import sectionService from "../sections/section.service";

jest.mock("../../api/ticket.api");
jest.mock("../prices/price.service");
jest.mock("../sections/section.service");

describe("ticketService", () => {
  beforeEach(() => {

  });

  it("should resolve to array of tickets", async () => {
    const packageId = 1919;

    (ticketApi.fetchSeats as jest.Mock).mockResolvedValueOnce([seatMock]);

    (priceService.fetchPrices as jest.Mock).mockResolvedValueOnce({});
    (sectionService.fetchSections as jest.Mock).mockResolvedValueOnce({});

    (priceService.findPriceByZoneId as jest.Mock).mockReturnValueOnce({ ...priceMock });
    (sectionService.findSectionById as jest.Mock).mockReturnValueOnce({...sectionMock});

    expect(await ticketService.getTickets(packageId)).toEqual([ticketMock]);
  })
});
