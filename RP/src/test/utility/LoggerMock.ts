import { ILogger } from "../../businesslogic/plugIn/Ilogger";


export class LoggerMock implements ILogger{
    logDebug(message: string): void {    }
    logError(message: string): void {    }
    logException(message: string, error: Error): void {    }
}