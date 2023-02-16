import { remedyPlanConditionDTO } from "../conditions/CreateCondition_IPBase"

export interface IUpdateRemedyPlanCondition{
    insert(condition:remedyPlanConditionDTO) : Promise<void>
}