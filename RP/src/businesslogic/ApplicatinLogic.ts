import { RemedyPlan, invocationResult, executeParameters } from "./RemedyPlan";

export class ApplicatinLogic{
    constructor(private remedyplans: RemedyPlan[]){}

    async externalTrigger(triggerName: string, divergenceType: string): Promise<void>{
        var result : invocationResult[]= []
        var data : executeParameters = {
            trigger : triggerName,
            divergenceType: divergenceType,
            parameters :{}
        }
        this.remedyplans.forEach(async rp => result.push(await rp.invoke(data)))
    }



}