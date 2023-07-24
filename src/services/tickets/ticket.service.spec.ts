import { priceMock, seatMock, sectionMock, ticketMock } from "../../mocks/entities.mock";
import ticketApi from "../../api/ticket.api";
import ticketService from "./ticket.service";

jest.mock("../../api/ticket.api");

describe("ticketService", () => {

  it("should resolve to array of tickets", async () => {
    const packageId = 1919;

    (ticketApi.fetchSeats as jest.Mock).mockResolvedValueOnce([seatMock]);
    (ticketApi.fetchPrices as jest.Mock).mockResolvedValueOnce([priceMock]);
    (ticketApi.fetchSections as jest.Mock).mockResolvedValueOnce([sectionMock]);

    expect(await ticketService.getTickets(packageId)).toEqual([ticketMock]);
  })
});
