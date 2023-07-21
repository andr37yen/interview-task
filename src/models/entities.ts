export interface Ticket {
  Id: number;
  SeatRow: string;
  SeatNumber: string;
  Price: number;
  Section: Section | null;
}

export interface Section {
  Id: number;
  Description: string;
  PrintDesc: string;
  SectionLegend: string;
  AdditionalText: string;
  AdditionalText2: string;
}
