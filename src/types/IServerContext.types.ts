import TicketService from "../services/tickets/ticket.service.abstract";

export interface IServerContext {
  ticketService: TicketService
}