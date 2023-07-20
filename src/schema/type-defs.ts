
export const typeDefs = `
  type Ticket {
    Id: Int!
    Section: String!
    SeatRow: String!
    SeatNumber: String!
    Price: Float!
  }

  type Query {
    tickets: [Ticket!]!
  }
`;
