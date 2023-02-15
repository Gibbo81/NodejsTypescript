import { executeParameters, invocationResult } from "../RemedyPlan";
import { Iaction } from "./Iaction";
import { IInfrastructureProvision } from "../plugIn/IInfrastructureProvision";
import { ILogger } from "../plugIn/Ilogger";

export class CreateCondition_IP implements Iaction{
    private readonly previousActionRequired ='CreateRemediPlan'
    
//TODO: read from configuration file - save condition on DB remedyPLAN 

    constructor(private kindId: number, 
                private topologyId: number,
                private duration : number,
                private logger: ILogger,
                private iP: IInfrastructureProvision){}
    
    private get durationInMillisecond(): number {
        return this.duration * 1000;
      }
    
    async execute(data : executeParameters, previousActions :invocationResult): Promise<{[key:string] : string}> {
        this.logger.logDebug(`Start infrastruction provision creation with data: ${JSON.stringify(data)} and previous actions ${JSON.stringify(previousActions)}`)
        var areaId= this.checkData(previousActions);
        var startingTime = new Date()
        var IPId = await this.iP.createIP(this.kindId, 
                                          this.topologyId,
                                          areaId, 
                                          startingTime,
                                          new Date(startingTime.getTime() + this.durationInMillisecond))
        this.logger.logDebug(`Created infrastruction provision with id: ${IPId}`)
        return {'actionName': 'CreateCondition_IP', 'id' : IPId.toString()};
    }

    private checkData(previousActions :invocationResult): number{
        var creationResult = previousActions.conditions.find(c => this.isPreviousActionARemedyPlanCreation(c.actionName))
        if (!(creationResult && creationResult.areaId))
            throw new Error(`CreateConditionIP impossible without a previous CreateRemediPlan action: ${JSON.stringify(previousActions)}`)
        return parseInt(creationResult.areaId)
    }

    private isPreviousActionARemedyPlanCreation(name:string):boolean{
        return name===this.previousActionRequired
    }
}