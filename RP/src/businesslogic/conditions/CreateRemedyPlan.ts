import { Icondition } from "./Icondition";

export class CreateRemediPlan implements Icondition{
    constructor(private connection:string){

    }
    execute(): void {
        throw new Error("Method not implemented.");
    }



}