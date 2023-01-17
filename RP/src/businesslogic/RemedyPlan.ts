import { Iaction } from "./conditions/Iaction";
import { ILogger } from "./plugIn/Ilogger";

export interface invocationResult{
    name: string;
    conditions :{[key:string] : string}[] ;
 }

export class RemedyPlan{

    constructor(public name: string, 
                private triggers: string[], 
                private conditions : Iaction[],
                private logger : ILogger ){}

    async invoke(input: string): Promise<invocationResult>{
        try{
            return await this.tryInvoke(input)
        }
        catch (e){
            this.logger.logException(`Error running remedy plan ${this.name}`, e)
            throw (e);
        }  
    }

    async tryInvoke(input: string): Promise<invocationResult>{
        if (this.isTriggered(input))
            return await this.execute(input)
        return this.createEmptyResult()  
    }

    private async execute(input: string): Promise<invocationResult>{
        this.logger.logDebug(`Remedy plan ${this.name} is triggered by input: ${input}`)
        var result: invocationResult = this.createEmptyResult()
        for (var x =0; x <this.conditions.length; x++)
            result.conditions.push(await this.conditions[x].execute({input}))
        this.logger.logDebug(`Completed Remedy plan ${this.name}`)
        return result
    }

    private isTriggered(input: string):boolean{
        if(this.triggers.find(t => t===input))
            return true
        return false
    }

    private createEmptyResult():invocationResult{
        return {name : this.name, conditions : []} 
    }
}