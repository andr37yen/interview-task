import ticketService from "../services/ticketService.js";

export const resolvers = {
  Query: {
    tickets: async (_parent:any, args:any) => {
      const val = await ticketService.getTickets(args.eventId);

      return val;
    },
  },
};
