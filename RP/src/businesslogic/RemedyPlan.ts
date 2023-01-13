import { Icondition } from "./conditions/Icondition";
import { ILogger } from "./plugIn/Ilogger";

export class RemedyPlan{//missing UT

    constructor(public name: string, 
                private triggers:string[], 
                private conditions :Icondition[],
                private logger : ILogger ){}

    async invoke(input: string): Promise<{
        name: string,
        conditions :{[key:string] : string}[]   
    }>{
        if (this.isTriggered(input))
            return await this.tryExecute(input)
        return {
            name: this.name,
            conditions:[]
        }
    }

    private async tryExecute(input: string): Promise<{
        name: string,
        conditions :{[key:string] : string}[]   
    }>{
        try{
            return await this.execute(input)
        }
        catch (e){
            this.logger.logException(`Error running remedy plan ${this.name}`, e)
            throw (e);
        }
    }
    
    private async execute(input: string): Promise<{
        name: string,
        conditions :{[key:string] : string}[]   
    }>{
        this.logger.logDebug(`Remedy plan ${this.name} is triggered by input: ${input}`)
        var result: {name: string, conditions :{[key:string] : string}[]} = {
            name : this.name,
            conditions : []
        } 
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
}