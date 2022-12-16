import { Icondition } from "./conditions/Icondition";

export class RemedyPlanConfigurations{

    constructor(public name: string, private triggers:string[], private conditions :Icondition[] ){}

}