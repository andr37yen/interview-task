import { Ticket } from "src/models/entities.js";
import ticketApi from "../api/ticketApi.js";

const ticketService = async () => {
  async function getTickets(eventId: number): Promise<Ticket[]> {
    const seats = await ticketApi.fetchSeats(eventId);
    const prices = await ticketApi.fetchPrices(eventId);
    const sections = await ticketApi.fetchSections();

    return seats
      .filter((seat) => seat.SeatStatusId === 0)
      .map((seat) => {
        return {
          Id: seat.Id,
          SeatRow: seat.SeatRow,
          SeatNumber: seat.SeatNumber,
          Price:
            prices.find(
              (price) =>
                price.ZoneId === seat.ZoneId && price.PerformanceId === 0
            )?.Price || 0,
          Section:
            sections.find((section) => section.Id === seat.SectionId) || null,
        };
      });
  }

  return Object.freeze({ getTickets });
};

export default await ticketService();
