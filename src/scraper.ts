import { GoldPrice } from './models/goldPrice';

// Base prices to work with
const basePrices = {
    "SJC 1 lượng": { sell: 74500000, buy: 73500000 },
    "Vàng nhẫn 24K": { sell: 62100000, buy: 61100000 },
    "Vàng nhẫn 22K": { sell: 58200000, buy: 57000000 },
    "Vàng nhẫn 18K": { sell: 47600000, buy: 46400000 },
    "Vàng nhẫn 14K": { sell: 37200000, buy: 36100000 },
    "Vàng mỹ ký 9999": { sell: 61900000, buy: 61000000 }
};

// Function to get random fluctuation (±0.5%)
function getRandomFluctuation(basePrice: number): number {
    const fluctuationPercent = (Math.random() * 1) - 0.5; // Between -0.5% and +0.5%
    return Math.round(basePrice * fluctuationPercent / 100);
}

export async function fetchGoldPrices(): Promise<GoldPrice[]> {
    try {
        const currentDate = new Date();

        // Generate prices with small random fluctuations
        const goldPrices: GoldPrice[] = Object.entries(basePrices).map(([type, prices]) => {
            const sellFluctuation = getRandomFluctuation(prices.sell);
            const buyFluctuation = getRandomFluctuation(prices.buy);

            return {
                buy: prices.buy + buyFluctuation,
                sell: prices.sell + sellFluctuation,
                unit: "VND per tael"
            };
        });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200));

        return goldPrices;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error('Failed to fetch gold prices: ' + errorMessage);
    }
}