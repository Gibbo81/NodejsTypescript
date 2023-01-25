export interface IReadRemedyPlan{
    readRPsAreaByStates(states : string[]) : Promise<number[]>
}