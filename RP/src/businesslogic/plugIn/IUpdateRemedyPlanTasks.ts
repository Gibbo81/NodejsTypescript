export interface IUpdateRemedyPlanTasks{
    insert(remedyPlanKey: string, taskChainGuid:string) : Promise<void>
}//Todo: missing concrete implementation