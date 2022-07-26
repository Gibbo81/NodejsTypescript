import { Icondition } from "./Icondition";
import { ISaveNewRemedy } from "../plugIn/ISaveNewRemedy";
import { RemedyPlanDTO } from "../dto/RemedyPlanDTO";
import { ILogger } from "../plugIn/Ilogger";

export class CreateRemediPlan implements Icondition{    
    
    constructor(private saver: ISaveNewRemedy, private logger: ILogger){}

    async execute(data : {[key:string] : string}): Promise<{[key:string] : string}> {
        this.checkData(data)
        var rp = this.createremedyDto(data);
        var id = await this.saver.insert(rp)
        this.logger.logDebug(`Created remedy plan with id: ${id}`)
        return {id};
    }

    private createremedyDto(data: { [key: string]: string; }) {
        var rp = new RemedyPlanDTO();
        rp.status = data.status;
        rp.owner = data.owner;
        rp.priority = parseInt(data.priority);
        return rp;
    }

    private checkData(data : {[key:string] : string}){
        var errors : string[] = []
        if(!data.owner)
            errors.push(`Missing owner: ${JSON.stringify(data)}`)
        if(!data.status)
            errors.push(`Missing owner: ${JSON.stringify(data)}`)
        if(!data.priority)
            errors.push(`Missing owner: ${JSON.stringify(data)}`)
        if(errors.length>0){
            this.logger.logError(`Error creating remedy plan ${JSON.stringify(errors)}`)
            throw new Error(`Create remedy plan condition invalid data ${JSON.stringify(errors)}`)
        }         
    }
}