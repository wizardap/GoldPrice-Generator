import axios from 'axios';
import { GoldPrice } from './models/goldPrice';

// Use host.docker.internal instead of localhost to reference the host machine
const API_URL = process.env.API_URL || 'http://host.docker.internal:8080/add';

export async function sendGoldPrices(vendorKey: string, goldPrice: GoldPrice): Promise<void> {
    try {
        // Format the data according to the required structure
        const formattedData = {
            key: vendorKey,
            value: goldPrice
        };

        await axios.post(API_URL, formattedData);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to send ${vendorKey} gold prices: ${errorMessage}`);
    }
}