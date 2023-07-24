import ticketApi from "../../api/ticket.api";
import { PriceDto } from "../../models/dtos";

const pricesService = () => {
  let prices: PriceDto[] = [];

  const fetchPrices = async (packageId: Number): Promise<PriceDto[]> => {
    prices = await ticketApi.fetchPrices(packageId);

    return prices;
  };

  const getPrices = (): PriceDto[] => {
    return prices;
  };

  const findPriceByZoneId = (ZoneId: number): PriceDto => {
    const price = prices.find(
      (el) => el.PerformanceId === 0 && el.ZoneId === ZoneId
    );

    if (!price) throw new Error("Could not find price by ZoneId");

    return price;
  };

  return Object.freeze({
    fetchPrices,
    getPrices,
    findPriceByZoneId,
  });
};

export default pricesService();
