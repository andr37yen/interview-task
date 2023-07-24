import axios from "axios";
import { priceMock, seatMock, seatStatusMock, sectionMock } from "../mocks/entities.mock";
import ticketApi from "./ticket.api";

jest.mock("axios");

describe("ticketApi", () => {

  beforeEach(() => {
    (axios.get as jest.Mock).mockClear();
  })

  it("should resolve to array of prices if if get is successfull, otherwise it should throw", async () => {

    const packageId = 1919;

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [priceMock] });
    expect(await ticketApi.fetchPrices(packageId)).toEqual([priceMock]);

    (axios.get as jest.Mock).mockRejectedValueOnce({});
    await expect(ticketApi.fetchPrices(packageId)).rejects.toThrow("Failed to fetch prices");

    expect((axios.get as jest.Mock)).toBeCalledTimes(2);
  })

  it("should resolve to array of seats if get is successfull, otherwise it should throw", async () => {

    const packageId = 1919;

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [seatMock] });
    expect(await ticketApi.fetchSeats(packageId)).toEqual([seatMock]);

    (axios.get as jest.Mock).mockRejectedValueOnce({});
    await expect(ticketApi.fetchSeats(packageId)).rejects.toThrow("Failed to fetch seats");
    
    expect((axios.get as jest.Mock)).toBeCalledTimes(2);
  })

  it("should resolve to array of sections if get is successfull, otherwise it should throw", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [sectionMock] });
    expect(await ticketApi.fetchSections()).toEqual([sectionMock]);

    (axios.get as jest.Mock).mockRejectedValueOnce({});
    await expect(ticketApi.fetchSections()).rejects.toThrow("Failed to fetch sections");
    
    expect((axios.get as jest.Mock)).toBeCalledTimes(2);
  })

  it("should resolve to array of seat statuses if get is successfull, otherwise it should throw", async () => {

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [seatStatusMock] });
    expect(await ticketApi.fetchSeatStatuses()).toEqual([seatStatusMock]);

    (axios.get as jest.Mock).mockRejectedValueOnce({});
    await expect(ticketApi.fetchSeatStatuses()).rejects.toThrow("Failed to fetch seat statuses");
    
    expect((axios.get as jest.Mock)).toBeCalledTimes(2);
  })
})
