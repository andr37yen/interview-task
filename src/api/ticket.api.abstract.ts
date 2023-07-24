import { PriceDto, SeatDto, SeatStatusDto, SectionDto } from "../models/dtos";

abstract class TicketApi {
  public abstract fetchPrices (packegeId: Number): Promise<PriceDto[]>;

  public abstract fetchSeats (packegeId: Number): Promise<SeatDto[]>;

  public abstract fetchSections (): Promise<SectionDto[]>;

  public abstract fetchSeatStatuses (): Promise<SeatStatusDto[]>;
}

export default TicketApi;
