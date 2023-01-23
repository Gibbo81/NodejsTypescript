import { IPlanned } from "./IPlanned";
import { ILogger } from "../plugIn/Ilogger";

export class BrokenTdTAlreadyInsideARemedyPlan implements IPlanned{
    constructor(private logger:ILogger){}
    
    isAlreadyPlanned(data: { [key: string]: string; }): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}