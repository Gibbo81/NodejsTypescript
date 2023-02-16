import { IInfrastructureProvision } from "../plugIn/IInfrastructureProvision";
import { ILogger } from "../plugIn/Ilogger";
import { IUpdateRemedyPlanCondition } from "../plugIn/IUpdateRemedyPlanCondition";
import { CreateCondition_IPBase } from "./CreateCondition_IPBase";

export class CreateCondition_IP_FixedDuretion extends CreateCondition_IPBase{    
    constructor(kindId: number, 
                topologyId: number,
                duration : number,                
                logger: ILogger,                
                iP: IInfrastructureProvision,
                conditions: IUpdateRemedyPlanCondition){
            super(kindId, topologyId, duration, logger, iP, conditions)
        }

    protected get conditionUndetermined(): boolean {
        return false
    }

    protected async PostCreationOperations(ipId: number): Promise<void> {}  
}   