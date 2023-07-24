import { Ticket } from "../../models/entities";

abstract class TicketService {
  public abstract getTickets(eventId: number): Promise<Ticket[]>;
}

export default TicketService;