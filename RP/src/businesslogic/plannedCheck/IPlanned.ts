export interface IPlanned{
    isAlreadyPlanned(data : {[key:string] : string}): boolean;
}