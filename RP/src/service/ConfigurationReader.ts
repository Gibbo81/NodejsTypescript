import { RemedyPlanConfigurations } from "../businesslogic/RemedyPlan";
import { Icondition } from "../businesslogic/conditions/Icondition";
import fs from "fs/promises";
import { ConfigurationDTO } from "./ConfigurationDTO";

export class ConfigurationReader{

    constructor(private folderPath: string){      
    }

    async load() : Promise<RemedyPlanConfigurations[]>{
        try{
            var result: RemedyPlanConfigurations[] =[]
            var files = await this.searchFiles(); 
            for(var x = 0; x< files.length; x++)
                await this.readSingleConfiguration(files, x, result);       
            this.checkResult(result);     
            return result
        }
        catch(e){
            console.log(e)
            throw(e)
        }        
    }

    private async readSingleConfiguration(files: string[], x: number, result: RemedyPlanConfigurations[]) {
        var y = await fs.readFile(files[x], 'utf8');
        result.push(this.convertToRemedyPlan(y, files[x]));
    }

    private checkResult(result: RemedyPlanConfigurations[]) {
        if (result.length === 0)
            throw new Error(`Load configuration from ${this.folderPath} 0 Remedy plan found`);
    }

    private convertToRemedyPlan(json: string, source : string): RemedyPlanConfigurations{
        var dto = JSON.parse(json) as ConfigurationDTO;                
        this.checkConfigurationErrors(dto, source);
        if (!dto.ClosingAction)
            dto.ClosingAction =[]
        return new RemedyPlanConfigurations(dto.Name, dto.Triggers.map(x => x.name), []) //TODO: add real remedy plan
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