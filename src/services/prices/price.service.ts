import TicketApi from "../../api/ticket.api.abstract";
import { PriceDto } from "../../models/dtos";
import PriceService from "./price.service.abstract";

class PriceServiceImpl implements PriceService {
  private _prices: PriceDto[] = [];

  constructor(private _ticketApi: TicketApi) {};

  public async fetchPrices(packageId: Number): Promise<PriceDto[]> {
    this._prices = await this._ticketApi.fetchPrices(packageId);

    return this._prices;
  }

  public getPrices(): PriceDto[] {
    return this._prices;
  }

  public findPriceByZoneId(zoneId: number): PriceDto {
    const price = this._prices.find(
      (el) => el.PerformanceId === 0 && el.ZoneId === zoneId
    );

    if (!price) throw new Error("Could not find price by ZoneId");

    return price;
  }
}

export default PriceServiceImpl;
