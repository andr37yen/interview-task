import TicketApiImpl from "../../api/ticket.api";
import TicketApi from "../../api/ticket.api.abstract";
import { priceMock } from "../../mocks/entities.mock";
import PriceService from "../prices/price.service.abstract";
import PriceServiceImpl from "./price.service";

jest.mock("../../api/ticket.api");

describe("pricesService", () => {
  let priceService: PriceService;
  let ticketApi: TicketApi;

  beforeAll(() => {
    ticketApi = new TicketApiImpl("fakedomain");
    priceService = new PriceServiceImpl(ticketApi);
  })

  beforeEach(() => {
    (ticketApi.fetchPrices as jest.Mock).mockClear();
  });

  it("should succeed if value of prices inside function changes ", async () => {
    const packageId = 1919;

    expect(priceService.getPrices()).toEqual([]);

    (ticketApi.fetchPrices as jest.Mock).mockResolvedValueOnce([priceMock]);
    expect(await priceService.fetchPrices(packageId)).toEqual([priceMock]);

    expect(priceService.getPrices()).toEqual([priceMock]);
  });

  it("should return price if found otherwise it throws", async () => {
    const validZoneId = 4;
    const packageId = 1919;

    (ticketApi.fetchPrices as jest.Mock).mockResolvedValueOnce([priceMock]);
    await priceService.fetchPrices(packageId);

    expect(priceService.findPriceByZoneId(validZoneId)).toEqual(priceMock);

    expect(() => priceService.findPriceByZoneId(0)).toThrow();
  });
});
