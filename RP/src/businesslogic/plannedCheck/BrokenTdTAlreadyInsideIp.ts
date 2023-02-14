import { IPlanned } from "./IPlanned";
import {IReadInfrastructionProvision} from "../plugIn/IReadInfrastructionProvision"
import { ILogger } from "../plugIn/Ilogger";

export class BrokenTdTAlreadyInsideIp implements IPlanned{
    constructor(private ipInfo:IReadInfrastructionProvision,
                private logger:ILogger){}

    async isAlreadyPlanned(data: { [key: string]: string; }): Promise<boolean> {
        try{
            return await this.isAlreadyPlannedTryCheck(data)
        }
        catch(e){
            this.logger.logException(`Error running check BrokenTdTAlreadyInsideIp`, e);
            throw (e);
        }
    }

    private async isAlreadyPlannedTryCheck(data: { [key: string]: string; }): Promise<boolean> {
        this.checkData(data)
        this.logger.logDebug(`BrokenTdTAlreadyInsideIp starts check with parameters: ${data.TdT}`)
        var IPs = await this.ipInfo.readAllActivePossessionAndTsa()
        return await this.IsTdTInsideAnyIp(IPs, data.TdT);
    }

    private async IsTdTInsideAnyIp(IPs: number[], TdT: string) {
        for (var x = 0; x < IPs.length; x++)
            if ((await this.ipInfo.readTdTByIp(IPs[x])).find(x => TdT === x))
            return this.returnAndLog(true, TdT)            
        return this.returnAndLog(false, TdT)
    }

    private returnAndLog(result: boolean, TdT: string) {
        this.logger.logDebug(`BrokenTdTAlreadyInsideIp check with parameters: ${TdT} return ${result}`);
        return result;
    }

    private checkData(data: {[key: string]: string; }): void {
        if(!data.TdT)
            throw new Error(`BrokenTdTAlreadyInsideIp check: missing TdT value`)         
    }
}