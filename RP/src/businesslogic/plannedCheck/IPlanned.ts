export interface IPlanned{
    isAlreadyPlanned(data : {[key:string] : string}): Promise<boolean>;
}