import { Iaction } from "./Iaction";
import { ISaveNewRemedy } from "../plugIn/ISaveNewRemedy";
import { RemedyPlanDTO, rootcause } from "../dto/RemedyPlanDTO";
import { ILogger } from "../plugIn/Ilogger";
import { executeParameters } from "../RemedyPlan"
import { Guid } from "guid-typescript";
import { ICreateArea } from "../plugIn/ICreateArea";
import { IOwners } from "../plugIn/IOwners";

export class CreateRemediPlan implements Iaction{    
    
    constructor(private creationStatus: string, 
                private saver: ISaveNewRemedy,
                private area : ICreateArea, 
                private logger: ILogger,
                private owner : IOwners){}

    async execute(data : executeParameters): Promise<{[key:string] : string}> {
        await this.checkData(data)
        var areaId = await this.area.createArea(data.trigger)
        var rp = await this.createremedyDto(data, areaId);
        var id = await this.saver.insert(rp)
        this.logger.logDebug(`Created remedy plan with id: ${id}`)
        return {id};
    }

    private async createremedyDto(data: executeParameters, areaId : number): Promise<RemedyPlanDTO> {
        var rp = new RemedyPlanDTO();
        rp.status = this.creationStatus;
        rp.owner = data.parameters.owner;
        rp.priority = parseInt(data.parameters.priority);
        rp.divergences = [await this.divergence(data, areaId) ]
        return rp;
    }

    private async divergence(data: executeParameters, areaId : number): Promise<rootcause> {
        var rc = new rootcause()
        rc.id = Guid.raw()
        rc.detectionTime = new Date().toUTCString();
        rc.status = 'detected'
        rc.areaId = areaId
        rc.type = data.divergenceType
        rc.triggerName = data.trigger
        rc.hidden = false
        rc.primary = true
        return rc
    }

    private async checkData(data : executeParameters){
        var errors : string[] = [] //toDO: I'm not sure this information are inside data and note read from external source
        if(!data.parameters.owner)
            data.parameters.owner = await this.owner.getOwner(data.trigger)
        if(!data.parameters.priority)
            errors.push(`Missing priority: ${JSON.stringify(data)}`)
        if(errors.length>0){
            this.logger.logError(`Error creating remedy plan ${JSON.stringify(errors)}`)
            throw new Error(`Create remedy plan condition invalid data ${JSON.stringify(errors)}`)
        }         
    }
}