import { IReadInfrastructionProvision } from "../businesslogic/plugIn/IReadInfrastructionProvision";
import { ITdT } from "../businesslogic/plugIn/ITdT";
import { ILogger } from "../businesslogic/plugIn/Ilogger";

export class IFMOinteractions_FAKE implements IReadInfrastructionProvision, ITdT{
    constructor(private logger:ILogger){}
    
    async getTdTByArea(area: number): Promise<string[]> {
        var length = this.randomValueFrom0ToX(10)
        var result : string[] = []
        for (var x =0; x<length; x++)
            result.push(`TdT_${this.randomValueFrom0ToX(1000)}`)
        this.logger.logDebug(`Read TdT for area ${area} returns: ${JSON.stringify(result)}`)
        return result
    }

    async readAllActivePossessionAndTsa(): Promise<number[]> {
        var length = this.randomValueFrom0ToX(10)
        var result : number[] = []
        for (var x =0; x<length; x++)
            result.push(this.randomValueFrom0ToX(1000))
        this.logger.logDebug(`Read all active possessions and tsas returns: ${JSON.stringify(result)}`)
        return result
    }

    async readTdTByIp(ipId: number): Promise<string[]> {
        var length = this.randomValueFrom0ToX(10)
        var result : string[] = []
        for (var x =0; x<length; x++)
            result.push(`TdT_${this.randomValueFrom0ToX(1000)}`)
        this.logger.logDebug(`Read TdT for ip ${ipId} returns: ${JSON.stringify(result)}`)
        return result
    }

    private randomValueFrom0ToX(x: number): number{
        return Math.floor(Math.random() * x) + 1
    }
}