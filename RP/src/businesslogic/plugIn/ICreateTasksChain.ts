export interface ICreateTasksChain{
    createTasksChain(chainType: string, ipId : number) : Promise<void>
}