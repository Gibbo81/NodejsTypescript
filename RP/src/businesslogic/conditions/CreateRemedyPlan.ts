import { Iaction } from "./Iaction";
import { ISaveNewRemedy } from "../plugIn/ISaveNewRemedy";
import { RemedyPlanDTO, rootcause } from "../dto/RemedyPlanDTO";
import { ILogger } from "../plugIn/Ilogger";
import { executeParameters } from "../RemedyPlan"
import { Guid } from "guid-typescript";

export class CreateRemediPlan implements Iaction{    
    
    constructor(private creationStatus: string, 
                private saver: ISaveNewRemedy, 
                private logger: ILogger){}

    async execute(data : executeParameters): Promise<{[key:string] : string}> {
        this.checkData(data)
        var rp = this.createremedyDto(data);
        var id = await this.saver.insert(rp)
        this.logger.logDebug(`Created remedy plan with id: ${id}`)
        return {id};
    }

    private createremedyDto(data: executeParameters): RemedyPlanDTO {
        var rp = new RemedyPlanDTO();
        rp.status = this.creationStatus;
        rp.owner = data.parameters.owner;
        rp.priority = parseInt(data.parameters.priority);
        return rp;
    }

    private divergence(data: executeParameters): rootcause {
        var r = new rootcause()
        r.id = Guid.raw()
        r.detectionTime = new Date().toUTCString();
        r.status = 'detected'
        
        return r
    }

    private checkData(data : executeParameters){
        var errors : string[] = [] //toDO: I'm not sure this information are inside data and note read from external source
        if(!data.parameters.owner)
            errors.push(`Missing owner: ${JSON.stringify(data)}`)
        if(!data.parameters.priority)
            errors.push(`Missing priority: ${JSON.stringify(data)}`)
        if(errors.length>0){
            this.logger.logError(`Error creating remedy plan ${JSON.stringify(errors)}`)
            throw new Error(`Create remedy plan condition invalid data ${JSON.stringify(errors)}`)
        }         
    }
}