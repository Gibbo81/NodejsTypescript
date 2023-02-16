import { remedyPlanConditionDTO } from "../conditions/CreateCondition_IP"

export interface IUpdateRemedyPlanCondition{
    insert(condition:remedyPlanConditionDTO) : Promise<void>
}