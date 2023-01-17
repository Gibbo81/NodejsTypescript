import { RemedyPlan, invocationResult } from "./RemedyPlan";

export class ApplicatinLogic{
    constructor(private remedyplans: RemedyPlan[]){}

    async externalTrigger(triggerName: string): Promise<void>{
        var result : invocationResult[]= []
        this.remedyplans.forEach(async rp => result.push(await rp.invoke(triggerName)))
    }



}