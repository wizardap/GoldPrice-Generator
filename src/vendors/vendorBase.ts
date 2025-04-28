import { GoldPrice } from '../models/goldPrice';
import { logError, logInfo } from '../utils/logger';
import { sendGoldPrices } from '../api';
import { VendorConfig } from '../config/vendors';

export abstract class VendorBase {
  protected config: VendorConfig;
  protected intervalId: NodeJS.Timeout | null = null;

  constructor(config: VendorConfig) {
    this.config = config;
  }

  abstract fetchPrices(): Promise<GoldPrice>;

  async processAndSend(): Promise<void> {
    try {
      const price = await this.fetchPrices();
      await sendGoldPrices(this.config.key, price);
      logInfo(`${this.config.name} gold prices sent successfully.`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logError(`Error processing ${this.config.name} gold prices: ${errorMessage}`);
    }
  }

  start(): void {
    if (this.intervalId) {
      this.stop();
    }

    // Run immediately once
    this.processAndSend();

    // Then set up interval
    this.intervalId = setInterval(
      () => this.processAndSend(),
      this.config.updateIntervalMs
    );

    logInfo(`${this.config.name} vendor started with update interval: ${this.config.updateIntervalMs}ms`);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      logInfo(`${this.config.name} vendor stopped`);
    }
  }
}