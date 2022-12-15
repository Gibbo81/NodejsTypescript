import { Icondition } from "./conditions/Icondition";

export class RemedyPlan{

    constructor(public name: string, private triggers:string[], private conditions :Icondition[] ){}

}