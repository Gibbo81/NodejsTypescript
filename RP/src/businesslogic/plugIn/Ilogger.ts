export interface ILogger{
    logDebug(message: string):void
    logError(message: string):void
    logException(message: string, error: Error):void
}