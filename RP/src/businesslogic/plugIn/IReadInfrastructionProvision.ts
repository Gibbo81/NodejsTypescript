export interface IReadInfrastructionProvision{
    readAllActivePossessionAndTsa() : Promise<number[]>
    readTdTByIp(ipId: number) : Promise<string[]>
}
