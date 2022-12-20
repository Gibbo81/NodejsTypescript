export interface Icondition{
    execute(data : { [key:string] : string}) : Promise<{[key:string] : string}>
}