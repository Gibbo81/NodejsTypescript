import { ICreateTasksChain } from "../businesslogic/plugIn/ICreateTasksChain";
import { Guid } from "guid-typescript";
import { ILogger } from "../businesslogic/plugIn/Ilogger";

export class TaskManagerMock implements ICreateTasksChain{
    constructor(private logger: ILogger){}

    async createTasksChain(chainType: string, ipId: number): Promise<string> {
        var result = Guid.raw()
        this.logger.logDebug(`Creates task chain with guid: ${result}`)
        return result
    }
}