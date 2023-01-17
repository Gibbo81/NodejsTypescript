export interface Iaction{
    execute(data : { [key:string] : string}) : Promise<{[key:string] : string}>
}