import { VendorBase } from './vendorBase';
import { GoldPrice } from '../models/goldPrice';

// Base prices for DOJI (with slightly different structure/values)
const basePrices = {
  "DOJI SJC": { sell: 74600000, buy: 73600000 },
  "Vàng DOJI 24K": { sell: 62200000, buy: 61200000 },
  "Vàng DOJI 22K": { sell: 58300000, buy: 57100000 },
  "Vàng DOJI 18K": { sell: 47700000, buy: 46500000 },
};

// Function to get random fluctuation (±0.6%)
function getRandomFluctuation(basePrice: number): number {
  const fluctuationPercent = (Math.random() * 1.2) - 0.6; 
  return Math.round(basePrice * fluctuationPercent / 100);
}

export class DOJIVendor extends VendorBase {
  async fetchPrices(): Promise<GoldPrice[]> {
    try {
      const currentDate = new Date();
      
      const goldPrices: GoldPrice[] = Object.entries(basePrices).map(([type, prices]) => {
        const sellFluctuation = getRandomFluctuation(prices.sell);
        const buyFluctuation = getRandomFluctuation(prices.buy);

        return {
          type,
          sellPrice: prices.sell + sellFluctuation,
          buyPrice: prices.buy + buyFluctuation,
          updatedAt: currentDate
        };
      });

      await new Promise(resolve => setTimeout(resolve, 300)); // Different delay

      return goldPrices;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch DOJI gold prices: ${errorMessage}`);
    }
  }
}