import { Ticket } from "../../models/entities";
import SectionService from "../sections/section.service.abstract";
import PriceService from "../prices/price.service.abstract";
import TicketApi from "../../api/ticket.api.abstract";

class TicketServiceImpl {
  constructor(
    private _ticketApi: TicketApi,
    private _sectionService: SectionService,
    private _priceService: PriceService
  ) {}

  public async getTickets(eventId: number): Promise<Ticket[]> {
    const seats = await this._ticketApi.fetchSeats(eventId);

    await this._sectionService.fetchSections();
    await this._priceService.fetchPrices(eventId);

    return seats
      .filter((seat) => seat.SeatStatusId === 0)
      .map((seat) => {
        return {
          Id: seat.Id,
          SeatRow: seat.SeatRow,
          SeatNumber: seat.SeatNumber,
          Price: this._priceService.findPriceByZoneId(seat.ZoneId).Price,
          Section: this._sectionService.findSectionById(seat.SectionId),
        };
      });
  }
}

export default TicketServiceImpl;
