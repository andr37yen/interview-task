export interface Ticket {
  Id: number;
  SeatRow: string;
  SeatNumber: string;
  Price: number;
  Section: Section;
}

export interface Section {
  Id: number;
  Description: string;
  PrintDesc: string;
  SectionLegend: string;
  AdditionalText: string;
  AdditionalText2: string;
}

export interface Price {
  Price: number;
  ZoneId: number;
  PackageId: number;
  PerformanceId: number;
  PriceTypeId: number;
}
