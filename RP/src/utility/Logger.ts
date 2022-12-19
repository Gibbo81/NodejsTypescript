import { ILogger } from "../businesslogic/plugIn/Ilogger";

export class Logger implements ILogger{
    logDebug(message: string): void {
        console.log(`Debug: ${message}`)
    }
    logError(message: string): void {
        console.log(`Error: ${message}`)
    }
    logException(message: string, error: Error): void {
        console.log(`Error: ${message} Exception: ${error.message} stack: ${error.stack}`)
    }
}