import ticketService from "../services/ticket.service.js";

export const resolvers = {
  Query: {
    tickets: async (_parent:any, args:any) => {
      const val = await ticketService.getTickets(args.eventId);

      return val;
    },
  },
};
