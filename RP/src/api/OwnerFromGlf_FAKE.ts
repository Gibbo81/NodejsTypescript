import { IOwners } from "../businesslogic/plugIn/IOwners";

export class OwnerFromGlf_FAKE implements IOwners{
    
    async getOwner(trigger: string): Promise<string> {
        return 'User' + (Math.floor(Math.random() * 100) + 1).toString();
    }
}
