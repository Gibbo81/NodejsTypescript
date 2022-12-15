import { RemedyPlan } from "../businesslogic/RemedyPlan";
import fs from "fs/promises";
import { ConfigurationDTO } from "./ConfigurationDTO";

export class ConfigurationReader{

    constructor(private folderPath: string){      
    }

    async load() : Promise<RemedyPlan[]>{
        try{
            var result: RemedyPlan[] =[]
            var files = await this.searchFiles(); 
            for(var x =0; x< files.length; x++){
                var y = await fs.readFile(files[x], 'utf8')
                result.push(this.convertToRemedyPlan(y,files[x]))  
            }      
            if(result.length===0)
                throw new Error(`Load configuration from ${this.folderPath} 0 Remedy plan found`)     
            return result
        }
        catch(e){
            console.log(e)
            throw(e)
        }        
    }

    private convertToRemedyPlan(json: string, source : string): RemedyPlan{
        var dto = JSON.parse(json) as ConfigurationDTO;                
        this.checkConfigurationErrors(dto, source);
        if (!dto.ClosingAction)
            dto.ClosingAction =[]
        return new RemedyPlan(dto.Name, dto.Triggers.map(x => x.name))
    }

    private isFileJson = (filename: string): boolean =>
        (filename.substring(filename.lastIndexOf('.'), filename.length) || filename).toLowerCase() === '.json'

    private checkConfigurationErrors(dto: ConfigurationDTO, source: string) {
        var errors: string[]=[]
        if (!dto.Name)
            errors.push(`missing name - ${source} ***`)
        if (!dto.Unplanned_checks)
            errors.push(`missing unplanned checks - ${source} ***`)
        if (!dto.Triggers)
            errors.push(`missing trigger - ${source} ***`)
        if (!dto.Conditions)
            errors.push(`missing conditions - ${source} ***`)
        if (errors.length > 0)
            throw new Error(errors.toString())
    }

    private async searchFiles(): Promise<string[]> {
        var files = await fs.readdir(this.folderPath)
        return files.filter(this.isFileJson).map(fileName => this.folderPath + fileName)
    }
}