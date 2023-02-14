import { executeParameters, invocationResult } from "../RemedyPlan"

export interface Iaction{
    execute(data : executeParameters, previousActionsResults :invocationResult) : Promise<{[key:string] : string}>
}