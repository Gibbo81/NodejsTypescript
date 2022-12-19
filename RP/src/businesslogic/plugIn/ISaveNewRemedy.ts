import { RemedyPlanDTO } from "../dto/RemedyPlanDTO"

export interface ISaveNewRemedy{
    insert(rp:RemedyPlanDTO) : Promise<string>
}