import { Iaction } from "./conditions/Iaction";
import { IPlanned } from "./plannedCheck/IPlanned";
import { ILogger } from "./plugIn/Ilogger";

export interface invocationResult{
    name: string;
    conditions :{[key:string] : string}[] ;
 }

 export interface executeParameters{
    trigger: string;
    divergenceType: string;
    parameters :{[key:string] : string} ;
 }

export class RemedyPlan{

    constructor(public name: string, 
                private triggers: string[],
                private unplannedChecks : IPlanned[], 
                private conditions : Iaction[],
                private logger : ILogger ){}

    async invoke(input: executeParameters): Promise<invocationResult>{
        try{
            return await this.tryInvoke(input)
        }
        catch (e){
            this.logger.logException(`Error running remedy plan ${this.name}`, e)
            throw (e);
        }  
    }

    async tryInvoke(input: executeParameters): Promise<invocationResult>{
        this.logger.logDebug(`Start invokation of Remedy plan ${this.name} with trigger: ${input.trigger}`)
        if (this.isTriggered(input.trigger) && this.isNotAlreadyPlanned(input.parameters))
            return await this.execute(input)
        return this.createEmptyResult()  
    }

    private async execute(input: executeParameters): Promise<invocationResult>{
        this.logger.logDebug(`Remedy plan ${this.name} is triggered by input: ${input.trigger}`)
        var result = await this.executeConditions(input);
        this.logger.logDebug(`Completed Remedy plan ${this.name}`)
        return result
    }

    private async executeConditions(input: executeParameters) : Promise<invocationResult>{
        var result: invocationResult = this.createEmptyResult();
        for (var x = 0; x < this.conditions.length; x++)
            result.conditions.push(await this.conditions[x].execute(input));
        return result;
    }

    private isTriggered(input: string):boolean{
        if(this.triggers.find(t => t===input))
            return true
        return false
    }

    private isNotAlreadyPlanned(parameters :{[key:string] : string}): boolean{
        for (var x =0; x< this.unplannedChecks.length; x++)
            if (this.unplannedChecks[x].isAlreadyPlanned(parameters)){
                this.logger.logDebug(`Remedy plan ${this.name} is already planned. Its configured actions are not executed`)    
                return false
            }                
        return true
    }

    private createEmptyResult():invocationResult{
        return {name : this.name, conditions : []} 
    }
}