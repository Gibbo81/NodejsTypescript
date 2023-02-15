import { IReadInfrastructionProvision } from "../businesslogic/plugIn/IReadInfrastructionProvision";
import { ITdT } from "../businesslogic/plugIn/ITdT";
import { ILogger } from "../businesslogic/plugIn/Ilogger";
import { IInfrastructureProvision } from "../businesslogic/plugIn/IInfrastructureProvision";


export class IFMOinteractions_FAKE implements IReadInfrastructionProvision, ITdT, IInfrastructureProvision{
    constructor(private logger:ILogger){}
    
    async createIP(kindId: number, topologyId: number, areaId: number, startTime: Date, endTime: Date): Promise<number> {
        return this.randomValueFrom1ToX(100)
    }
    
    async getTdTByArea(area: number): Promise<string[]> {
        var length = this.randomValueFrom1ToX(10)
        var result : string[] = []
        for (var x =0; x<length; x++)
            result.push(`TdT_${this.randomValueFrom1ToX(1000)}`)
        this.logger.logDebug(`Read TdT for area ${area} returns: ${JSON.stringify(result)}`)
        return result
    }

    async readAllActivePossessionAndTsa(): Promise<number[]> {
        var length = this.randomValueFrom1ToX(10)
        var result : number[] = []
        for (var x =0; x<length; x++)
            result.push(this.randomValueFrom1ToX(1000))
        this.logger.logDebug(`Read all active possessions and tsas returns: ${JSON.stringify(result)}`)
        return result
    }

    async readTdTByIp(ipId: number): Promise<string[]> {
        var length = this.randomValueFrom1ToX(10)
        var result : string[] = []
        for (var x =0; x<length; x++)
            result.push(`TdT_${this.randomValueFrom1ToX(1000)}`)
        this.logger.logDebug(`Read TdT for ip ${ipId} returns: ${JSON.stringify(result)}`)
        return result
    }

    private randomValueFrom1ToX(x: number): number{
        return Math.floor(Math.random() * x) + 1
    }
}