export interface IReadRemedyPlan{
    readActiveRPsAreaByStates(states : string[]) : Promise<number[]>
}