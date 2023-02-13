export interface IOwners{
    getOwner(trigger: string): Promise<string>
}