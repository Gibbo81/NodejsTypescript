export interface IInfrastructureProvision{
    createIP(kindId: number, 
             topologyId:number, 
             areaId: number,
             startTime : Date,
             endTime: Date): Promise<number>
}