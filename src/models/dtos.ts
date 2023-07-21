export interface SeatStatusDto {
  Id: number;
  Description: string;
  StatusCode: string;
}

export interface SectionDto {
  Id: number;
  Description: string;
  PrintDesc: string;
  SectionLegend: string;
  AdditionalText: string;
  AdditionalText2: string;
}

export interface SeatsDto {
  Id: number;
  SeatNumber: string;
  SeatRow: string;
  ZoneId: number;
  SectionId: number
  SeatStatusId: number;
}

export interface PriceDto {
  Price: number;
  ZoneId: number;
  PackageId: number;
  PerformanceId: number;
  PriceTypeId: number;
}
