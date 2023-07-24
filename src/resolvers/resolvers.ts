import { queryArgs } from "../types/query.types";
import ticketService from "../services/tickets/ticket.service";

export const resolvers = {
  Query: {
    tickets: async (_parent: any, args: queryArgs) => {
      const val = await ticketService.getTickets(args.eventId);

      if (!val) throw new Error("Failed to get tickets");

      return val;
    },
  },
};
