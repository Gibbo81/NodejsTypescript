import { IPlanned } from "./IPlanned";
import { ILogger } from "../plugIn/Ilogger";
import { IReadRemedyPlan } from "../plugIn/IReadRemedy";
import { ITdT } from "../plugIn/ITdT"; 

export class BrokenTdTAlreadyInsideARemedyPlan implements IPlanned{
    private readonly valideStates : string[] = ['Operational','Assigned', 'Milestone Missed']
    constructor(private logger:ILogger, 
                private remedyPlans :IReadRemedyPlan,
                private TdT:ITdT){}
    
    async isAlreadyPlanned(data: { [key: string]: string; }): Promise<boolean> {
        try{
            return await this.tryIsAlreadyPlanned(data);
        }
        catch(e){
            this.logger.logException(`Error running check BrokenTdTAlreadyInsideARemedyPlan`, e);
            throw (e);
        }
    }


    private async tryIsAlreadyPlanned(data: { [key: string]: string }): Promise<boolean>{
        this.checkParameters(data);
        this.logger.logDebug(`BrokenTdTAlreadyInsideARemedyPlan starts check with parameters: ${data.TdT}`)
        var areas = await this.remedyPlans.readRPsAreaByStates(this.valideStates);
        for (let index = 0; index < areas.length; index++) 
            if (await this.isTdTinsideArea(areas[index], data.TdT))
                return this.returnAndLog(true, data.TdT)            
        return this.returnAndLog(false, data.TdT)
    }

    private returnAndLog(result: boolean, TdT: string) {
        this.logger.logDebug(`BrokenTdTAlreadyInsideARemedyPlan check with parameters: ${TdT} return ${result}`);
        return result;
    }

    private async isTdTinsideArea(area: number, TdT: string):Promise<boolean> {
        return (await this.TdT.getTdTByArea(area)).includes(TdT);
    }

    private checkParameters(data: { [key: string]: string; }) {
        if (!data.TdT)
            throw new Error(`BrokenTdTAlreadyInsideARemedyPlan missing TdT informations: ${JSON.stringify(data)} `);
    }
}