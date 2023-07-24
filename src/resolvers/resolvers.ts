import { queryArgs } from "../types/query.types";
import { IServerContext } from "../types/IServerContext.types";

export const resolvers = {
  Query: {
    tickets: async (
      _parent: any,
      args: queryArgs,
      contextValue: IServerContext
    ) => {
      const val = await contextValue.ticketService.getTickets(args.eventId);

      if (!val) throw new Error("Failed to get tickets");

      return val;
    },
  },
};
