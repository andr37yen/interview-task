import { PriceDto } from "../../models/dtos";

abstract class PriceService {

  public abstract fetchPrices(packageId: Number): Promise<PriceDto[]>;

  public abstract getPrices(): PriceDto[];

  public abstract findPriceByZoneId(zoneId: number): PriceDto;
}

export default PriceService;