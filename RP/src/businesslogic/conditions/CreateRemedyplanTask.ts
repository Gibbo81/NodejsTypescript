import { executeParameters, invocationResult } from "../RemedyPlan";
import { Iaction } from "./Iaction";
import { ICreateTasksChain } from "../plugIn/ICreateTasksChain";
import { ILogger } from "../plugIn/Ilogger";
import { IUpdateRemedyPlanTasks } from "../plugIn/IUpdateRemedyPlanTasks";

export class CreateRemedyplanTask implements Iaction{
    private readonly previousCreateRemedyRequired ='CreateRemediPlan'
    private readonly previousCreateIpRequired ='CreateCondition_IP'
    constructor(private task: ICreateTasksChain, 
                private logger: ILogger, 
                private chainType: string,
                private remedyPlan: IUpdateRemedyPlanTasks){}    
    
    async execute(data: executeParameters, previousActionsResults: invocationResult)
    : Promise<{ [key: string]: string; }> {
        this.logger.logDebug(`Start CreateRemedyplanTask with data: ${JSON.stringify(data)} and previous actions ${JSON.stringify(previousActionsResults)}`)
        var info = this.checkData(previousActionsResults)
        var chainId = await this.task.createTasksChain(this.chainType, info.IpId)
        this.logger.logDebug(`Created task chain  with id: ${chainId}`)
        this.remedyPlan.insert(info.RemedyKey, chainId)
        this.logger.logDebug(`Updated remedyPLAn with with task info taskid: ${chainId}, remedy pla: ${info.RemedyKey}`)
        return {'actionName': 'CreateRemedyplanTask'};
    }

    private checkData(previousActions :invocationResult): SituationInfo{
        var creationRPResult = previousActions.conditions.find(c => this.isPreviousActionARemedyPlanCreation(c.actionName))
        if (!(creationRPResult && creationRPResult.id))
            throw new Error(`CreateConditionIP impossible without a previous CreateRemedyPlan action: ${JSON.stringify(previousActions)}`)
        var creationIPResult = previousActions.conditions.find(c => this.isPreviousActionAnInfrastructionProvisionCreation(c.actionName))
        if (!(creationIPResult && creationIPResult.id))
            throw new Error(`CreateConditionIP impossible without a previous CreateIp action: ${JSON.stringify(previousActions)}`)
        return new SituationInfo(parseInt(creationIPResult.id), creationRPResult.id)
    }

    private isPreviousActionARemedyPlanCreation(name:string):boolean{
        return name===this.previousCreateRemedyRequired
    }
    private isPreviousActionAnInfrastructionProvisionCreation(name:string):boolean{
        return name===this.previousCreateIpRequired
    }
}
//TODO: missing factory and unit tests
//todo: fix create remedy plan result using createRemedyplan instead of createRemediplan 

class SituationInfo {
    constructor(public IpId: number, public RemedyKey: string){}
}