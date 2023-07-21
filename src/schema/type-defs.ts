
export const typeDefs = `
  type Ticket {
    Id: Int!
    SeatRow: String!
    SeatNumber: String!
    Section: Section!
    Price: Float!
  }
  
  type Section {
    Id: Int!
    Description: String!
    PrintDesc: String!
    SectionLegend: String!
    AdditionalText: String!
    AdditionalText2: String!
  }

  type Query {
    tickets (eventId: Int): [Ticket!]!
  }
`;
