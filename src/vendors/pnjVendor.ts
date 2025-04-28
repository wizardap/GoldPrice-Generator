import { VendorBase } from './vendorBase';
import { GoldPrice } from '../models/goldPrice';

// Base prices for PNJ
const basePrice = {
  sell: 74500000,
  buy: 73500000
};

// Function to get random fluctuation (±0.5%)
function getRandomFluctuation(basePrice: number): number {
  const fluctuationPercent = (Math.random() * 1) - 0.5; // Between -0.5% and +0.5%
  return Math.round(basePrice * fluctuationPercent / 100);
}

export class PNJVendor extends VendorBase {
  async fetchPrices(): Promise<GoldPrice> {
    try {
      // Generate prices with small random fluctuations
      const sellFluctuation = getRandomFluctuation(basePrice.sell);
      const buyFluctuation = getRandomFluctuation(basePrice.buy);

      const goldPrice: GoldPrice = {
        sell: basePrice.sell + sellFluctuation,
        buy: basePrice.buy + buyFluctuation,
        unit: "VND per tael"
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 200));

      return goldPrice;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch PNJ gold prices: ${errorMessage}`);
    }
  }
}