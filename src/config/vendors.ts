export interface VendorConfig {
    name: string;
    key: string;
    updateIntervalMs: number;
    enabled: boolean;
}

export const vendors: VendorConfig[] = [
    {
        name: "PNJ",
        key: "PNJ",
        updateIntervalMs: 10000, // 10 seconds
        enabled: true
    },
    {
        name: "DOJI",
        key: "DOJI",
        updateIntervalMs: 15000, // 15 seconds
        enabled: true
    },
    {
        name: "SJC",
        key: "SJC",
        updateIntervalMs: 20000, // 20 seconds
        enabled: true
    },
    {
        name: "BaoTinMinhChau",
        key: "BTMC",
        updateIntervalMs: 30000, // 30 seconds
        enabled: true
    }
];