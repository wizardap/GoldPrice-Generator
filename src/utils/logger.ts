import fs from 'fs';

export function logInfo(message: string) {
    const logMessage = `[INFO] ${new Date().toISOString()}: ${message}`;
    console.log(logMessage);
    fs.appendFileSync('app.log', logMessage + '\n');
}

export function logError(message: string) {
    const logMessage = `[ERROR] ${new Date().toISOString()}: ${message}`;
    console.error(logMessage);
    fs.appendFileSync('app.log', logMessage + '\n');
}