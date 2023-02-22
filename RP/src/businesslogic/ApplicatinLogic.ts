import { RemedyPlan, invocationResult, executeParameters } from "./RemedyPlan";

enum divergenceTypes {
    Broken_TDT = 'Broken_TDT'
}

//todo: error management {e.g.: db acess error}
export class ApplicatinLogic{
    constructor(private remedyplans: RemedyPlan[]){}

    async externalTrigger(triggerName: string, divergenceType: string): Promise<void>{
        var result : invocationResult[]= []
        var data : executeParameters = {
            trigger : triggerName,
            divergenceType: divergenceType,
            parameters :{}
        }
        this.enrichParameters(divergenceType, data, triggerName);
        this.remedyplans.forEach(async rp => result.push(await rp.invoke(data)))
    }




    private enrichParameters(divergenceType: string, data: executeParameters, triggerName: string) {
        if (divergenceType === divergenceTypes.Broken_TDT.toString())
            data.parameters.TdT = triggerName;
    }
}