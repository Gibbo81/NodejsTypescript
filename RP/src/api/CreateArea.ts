import { ICreateArea } from "../businesslogic/plugIn/ICreateArea";

export class CreateAreaWithIFMO implements ICreateArea{    
    
    async createArea(trigger: string): Promise<number> {        
        return Math.floor(Math.random() * 100) + 1;
    }
}