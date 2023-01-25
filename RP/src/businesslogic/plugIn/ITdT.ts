export interface ITdT{
    getTdTByArea(area:number): Promise<string[]>
}