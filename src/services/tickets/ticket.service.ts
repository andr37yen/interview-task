import { Ticket } from "../../models/entities";
import ticketApi from "../../api/ticket.api";
import sectionService from "../sections/section.service";
import priceService from "../prices/price.service";
import sectionsService from "../sections/section.service";

const ticketService = () => {
  async function getTickets(eventId: number): Promise<Ticket[]> {
    const seats = await ticketApi.fetchSeats(eventId);

    await sectionService.fetchSections();
    await priceService.fetchPrices(eventId);

    return seats
      .filter((seat) => seat.SeatStatusId === 0)
      .map((seat) => {
        return {
          Id: seat.Id,
          SeatRow: seat.SeatRow,
          SeatNumber: seat.SeatNumber,
          Price: priceService.findPriceByZoneId(seat.ZoneId).Price,
          Section: sectionsService.findSectionById(seat.SectionId),
        };
      });
  }

  return Object.freeze({ getTickets });
};

export default ticketService();
