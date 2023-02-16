import { IInfrastructureProvision } from "../plugIn/IInfrastructureProvision";
import { ILogger } from "../plugIn/Ilogger";
import { IUpdateRemedyPlanCondition } from "../plugIn/IUpdateRemedyPlanCondition";
import { CreateCondition_IPBase } from "./CreateCondition_IPBase";
import { ICreateTasksChain } from "../plugIn/ICreateTasksChain";

export class CreateCondition_IP_UndeterminedDuretion extends CreateCondition_IPBase{
    private readonly undeterminConditionChainType= "undetermined"

    constructor(kindId: number, 
                topologyId: number,
                duration : number,                
                logger: ILogger,                
                iP: IInfrastructureProvision,
                conditions: IUpdateRemedyPlanCondition,
                private createTasks : ICreateTasksChain){
            super(kindId, topologyId, duration, logger, iP, conditions)
        }

    protected get conditionUndetermined(): boolean {
        return true
    }

    protected async PostCreationOperations(ipId: number): Promise<void> {        
        await this.createTasks.createTasksChain(this.undeterminConditionChainType, ipId)
    }  
}   //TODO:missing factory and missing ICreateTasksChain concrete implementation