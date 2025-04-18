import { logInfo, logError } from './utils/logger';
import { vendors } from './config/vendors';
import { PNJVendor } from './vendors/pnjVendor';
import { DOJIVendor } from './vendors/dojiVendor';
import { VendorBase } from './vendors/vendorBase';

// Import other vendor implementations
// import { SJCVendor } from './vendors/sjcVendor';
// import { BTMCVendor } from './vendors/btmcVendor';

const vendorInstances: VendorBase[] = [];

function createVendorInstance(vendorConfig: typeof vendors[0]): VendorBase | null {
    switch (vendorConfig.key) {
        case 'PNJ':
            return new PNJVendor(vendorConfig);
        case 'DOJI':
            return new DOJIVendor(vendorConfig);
        // Add cases for other vendors as they are implemented
        // case 'SJC':
        //     return new SJCVendor(vendorConfig);
        // case 'BTMC':
        //     return new BTMCVendor(vendorConfig);
        default:
            logError(`No implementation found for vendor: ${vendorConfig.name}`);
            return null;
    }
}

function initializeVendors() {
    // Start each enabled vendor
    vendors.forEach(vendorConfig => {
        if (vendorConfig.enabled) {
            const vendorInstance = createVendorInstance(vendorConfig);
            if (vendorInstance) {
                vendorInstances.push(vendorInstance);
                vendorInstance.start();
            }
        }
    });

    logInfo(`Started ${vendorInstances.length} vendor services`);
}

// Handle graceful shutdown
function setupShutdown() {
    process.on('SIGINT', () => {
        logInfo('Shutting down all vendor services...');
        vendorInstances.forEach(vendor => vendor.stop());
        process.exit(0);
    });
}

// Start the application
function main() {
    logInfo('Gold Price Generator starting up...');
    initializeVendors();
    setupShutdown();
    logInfo('Gold Price Generator running');
}

main();