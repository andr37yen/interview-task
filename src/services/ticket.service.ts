import { Ticket } from "src/models/entities.js";
import ticketApi from "../api/ticket.api.js";
import sectionService from "./sections/sections.service.js";
import pricesService from "./prices/prices.service.js";
import sectionsService from "./sections/sections.service.js";

const ticketService = async () => {
  async function getTickets(eventId: number): Promise<Ticket[]> {
    const seats = await ticketApi.fetchSeats(eventId);

    await sectionService.fetchSections();
    await pricesService.fetchPrices(eventId);

    return seats
      .filter((seat) => seat.SeatStatusId === 0)
      .map((seat) => {
        return {
          Id: seat.Id,
          SeatRow: seat.SeatRow,
          SeatNumber: seat.SeatNumber,
          Price: pricesService.findPriceByZoneId(seat.ZoneId).Price,
          Section: sectionsService.findSectionById(seat.SectionId),
        };
      });
  }

  return Object.freeze({ getTickets });
};

export default await ticketService();
