import { executeParameters, invocationResult } from "../RemedyPlan";
import { Iaction } from "./Iaction";
import { IInfrastructureProvision } from "../plugIn/IInfrastructureProvision";
import { ILogger } from "../plugIn/Ilogger";
import { IUpdateRemedyPlanCondition } from "../plugIn/IUpdateRemedyPlanCondition";

export class CreateCondition_IP implements Iaction{
    private readonly previousActionRequired ='CreateRemediPlan'

    //TODO:  specialized class for undetermined ip duration

    constructor(private kindId: number, 
                private topologyId: number,
                private duration : number,                
                private logger: ILogger,                
                private iP: IInfrastructureProvision,
                private conditions: IUpdateRemedyPlanCondition){}
    
    private readonly determinedConditionDuration: true                
    private get durationInMillisecond(): number {
        return this.duration * 1000;
      }
    
    async execute(data : executeParameters, previousActions :invocationResult): Promise<{[key:string] : string}> {
        this.logger.logDebug(`Start infrastructure provision creation with data: ${JSON.stringify(data)} and previous actions ${JSON.stringify(previousActions)}`)
        var remedyplanInfo = this.checkData(previousActions);
        var startingTime = new Date()
        var endTime = new Date(startingTime.getTime() + this.durationInMillisecond)
        var IPId = await this.iP.createIP(this.kindId, 
                                          this.topologyId,
                                          remedyplanInfo.areaId, 
                                          startingTime,
                                          endTime)
        this.logger.logDebug(`Created infrastructure provision with id: ${IPId}`)
        this.conditions.insert({
            type : 'Infrastructure Provision',
            id : IPId,
            startingTime : startingTime,
            endTime : endTime,
            duration : this.duration,
            conditionUndetermined: false,
            areaId : remedyplanInfo.areaId,
            remedyplanKey : remedyplanInfo.id
        })
        this.logger.logDebug(`Update RemedyPlan ${remedyplanInfo.id} with new infrastructure provision id: ${IPId}`)
        return {'actionName': 'CreateCondition_IP', 'id' : IPId.toString()};
    }

    private checkData(previousActions :invocationResult): remedyPlanData{
        var creationResult = previousActions.conditions.find(c => this.isPreviousActionARemedyPlanCreation(c.actionName))
        if (!(creationResult && creationResult.areaId && creationResult.id))
            throw new Error(`CreateConditionIP impossible without a previous CreateRemediPlan action: ${JSON.stringify(previousActions)}`)
        return {'areaId' :  parseInt(creationResult.areaId), 'id'  : creationResult.id}
    }

    private isPreviousActionARemedyPlanCreation(name:string):boolean{
        return name===this.previousActionRequired
    }
}

interface remedyPlanData {
    areaId : number,
    id : string
}

export interface remedyPlanConditionDTO{
    type : string
    id : number
    startingTime : Date
    endTime : Date
    duration : number
    conditionUndetermined : boolean
    areaId: number
    remedyplanKey : string    
}