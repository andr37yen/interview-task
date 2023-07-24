import axios from "axios";
import {
  PriceDto,
  SeatDto,
  SeatStatusDto,
  SectionDto,
} from "../models/dtos";
import TicketApi from "./ticket.api.abstract";

class TicketApiImpl implements TicketApi  {
  constructor(private _domain: string) { };

  public async fetchPrices (packegeId: Number): Promise<PriceDto[]> {
    try {
      const res = await axios.get(
        `${this._domain}/en/rest-proxy/TXN/Packages/${packegeId}/Prices`
      );

      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch prices");
    }
  };

  public async fetchSeats (packegeId: Number): Promise<SeatDto[]> {
    try {
      const res = await axios.get(
        `${this._domain}/en/rest-proxy/TXN/Packages/${packegeId}/Seats?constituentId=0&modeOfSaleId=26`
      );

      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch seats");
    }
  };

  public async fetchSections (): Promise<SectionDto[]> {
    try {
      const res = await axios.get(
        `${this._domain}/en/rest-proxy/ReferenceData/Sections`
      );
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch sections");
    }
  };

  public async fetchSeatStatuses (): Promise<SeatStatusDto[]> {
    try {
      const res = await axios.get(
        `${this._domain}/en/rest-proxy/ReferenceData/SeatStatuses`
      );

      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch seat statuses");
    }
  };
};

export default TicketApiImpl;
