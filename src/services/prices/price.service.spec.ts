import { priceMock } from "../../mocks/entities.mock";
import ticketApi from "../../api/ticket.api";
import priceService from "./price.service";

jest.mock("../../api/ticket.api");

describe("pricesService", () => {
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
    const validZoneId = 2;
    const packageId = 1919;

    (ticketApi.fetchPrices as jest.Mock).mockResolvedValueOnce([priceMock]);
    await priceService.fetchPrices(packageId);

    expect(priceService.findPriceByZoneId(validZoneId)).toEqual(priceMock);

    expect(() => priceService.findPriceByZoneId(0)).toThrow();
  });
});
