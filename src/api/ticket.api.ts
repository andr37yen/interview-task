import axios from "axios";
import {
  PriceDto,
  SeatStatusDto,
  SeatsDto,
  SectionDto,
} from "src/models/dtos.js";

const ticketApi = () => {
  const fetchPrices = async (packegeId: Number): Promise<PriceDto[]> => {
    try {
      const res = await axios.get(
        `https://my.laphil.com/en/rest-proxy/TXN/Packages/${packegeId}/Prices`
      );

      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch prices");
    }
  };

  const fetchSeats = async (packegeId: Number): Promise<SeatsDto[]> => {
    try {
      const res = await axios.get(
        `https://my.laphil.com/en/rest-proxy/TXN/Packages/${packegeId}/Seats?constituentId=0&modeOfSaleId=26`
      );

      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch seats");
    }
  };

  const fetchSections = async (): Promise<SectionDto[]> => {
    try {
      const res = await axios.get(
        `https://my.laphil.com/en/rest-proxy/ReferenceData/Sections`
      );
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch sections");
    }
  };

  const fetchSeatStatuses = async (): Promise<SeatStatusDto[]> => {
    try {
      const res = await axios.get(
        `https://my.laphil.com/en/rest-proxy/ReferenceData/SeatStatuses`
      );

      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch seat statuses");
    }
  };

  return Object.freeze({
    fetchPrices,
    fetchSeats,
    fetchSections,
    fetchSeatStatuses,
  });
};

export default ticketApi();
