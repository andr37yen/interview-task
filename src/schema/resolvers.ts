import { ticketList } from "../fakeData.js";

export const resolvers = {
  Query: {
    tickets: () => ticketList,
  },
};
