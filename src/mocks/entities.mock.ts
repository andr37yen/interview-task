export const priceMock = {
  Price: 100,
  PackageId: 1919,
  PerformanceId: 0,
  PriceTypeId: 3,
  ZoneId: 4
};

export const seatMock = {
  Id: 13331,
  SeatNumber: "131",
  SeatRow: "B",
  ZoneId: 4,
  SectionId: 907,
  SeatStatusId: 0
}

export const seatStatusMock  = {
  id : 0,
  Description: "Available",
  StatusCode: 0,
}

export const sectionMock = {
  Id: 907,
  Description: "",
  PrintDesc: "",
  SectionLegend: "",
  AdditionalText: "",
  AdditionalText2: "",
}

export const ticketMock = {
  Id: 13331,
  SeatRow: "B",
  SeatNumber: "131",
  Price: 100,
  Section: { ...sectionMock },
};