import { executeParameters } from "../RemedyPlan"

export interface Iaction{
    execute(data : executeParameters) : Promise<{[key:string] : string}>
}