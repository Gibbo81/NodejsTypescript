import { RemedyPlan } from "../businesslogic/RemedyPlan";
import fs from "fs/promises";
import { ConfigurationDTO } from "./ConfigurationDTO";
import { ConditionFactory } from "./ConditionFactory";
import { ILogger } from "../businesslogic/plugIn/Ilogger";

export class ConfigurationReader{

    constructor(private folderPath: string, 
                private conditionFactory: ConditionFactory,
                private logger : ILogger){}

    async load() : Promise<RemedyPlan[]>{
        try{
            var result: RemedyPlan[] =[]
            var files = await this.searchFiles(); 
            for(var x = 0; x< files.length; x++)
                result.push( await this.readSingleConfiguration(files[x]));       
            this.checkResult(result);     
            return result
        }
        catch(e){
            console.log(e)
            throw(e)
        }        
    }

    private async readSingleConfiguration(file: string): Promise<RemedyPlan> {
        this.logger.logDebug(`Read configuration file: ${file}`)
        var y = await fs.readFile(file, 'utf8');
        return this.convertToRemedyPlan(y, file);
    }

    private checkResult(result: RemedyPlan[]) {
        if (result.length === 0)
            throw new Error(`Load configuration from ${this.folderPath} 0 Remedy plan found`);
    }

    private convertToRemedyPlan(json: string, source : string): RemedyPlan{
        var dto = JSON.parse(json) as ConfigurationDTO;                
        this.checkConfigurationErrors(dto, source);
        if (!dto.ClosingAction)
            dto.ClosingAction =[]
        var conditions = this.conditionFactory.create(dto)
        return new RemedyPlan(dto.Name, dto.Triggers.map(x => x.Name), conditions, this.logger) 
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

