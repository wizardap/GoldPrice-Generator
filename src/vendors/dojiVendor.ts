import { VendorBase } from './vendorBase';
import { GoldPrice } from '../models/goldPrice';

// Base price for DOJI
const basePrice = {
  sell: 6930000,
  buy: 6840000
};

// Function to get random fluctuation (±0.6%)
function getRandomFluctuation(basePrice: number): number {
  const fluctuationPercent = (Math.random() * 1.2) - 0.6;
  return Math.round(basePrice * fluctuationPercent / 100);
}

export class DOJIVendor extends VendorBase {
  async fetchPrices(): Promise<GoldPrice> {
    try {
      // Generate prices with small random fluctuations
      const sellFluctuation = getRandomFluctuation(basePrice.sell);
      const buyFluctuation = getRandomFluctuation(basePrice.buy);

      const goldPrice: GoldPrice = {
        sell: basePrice.sell + sellFluctuation,
        buy: basePrice.buy + buyFluctuation,
        unit: "VND per ounce"
      };

      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

      return goldPrice;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch DOJI gold prices: ${errorMessage}`);
    }
  }
}