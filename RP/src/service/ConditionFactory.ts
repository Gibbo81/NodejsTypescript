import { ConfigurationDTO, Condition } from "./ConfigurationDTO";
import { Iaction } from "../businesslogic/conditions/Iaction";
import { CreateRemediPlan } from "../businesslogic/conditions/CreateRemedyPlan";
import { CreateRemedyPlanDB } from "../mongoDB/CreateRemedyPlanDB";
import { Logger } from "../utility/Logger";
import { CreateAreaWithIFMO } from "../api/CreateArea";
import { OwnerFromGlf_FAKE } from "../api/OwnerFromGlf_FAKE";
import { CreateCondition_IP_FixedDuretion } from "../businesslogic/conditions/CreateCondition_IP_FixedDuretion";
import { IFMOinteractions_FAKE } from "../api/IFMOinteractions_FAKE";
import { UpdateRemediPlanOnMongo } from "../mongoDB/UpdateRemediPlanOnMongo";

enum ConditionTypes {
    CreateRemedyPlan = 'CreateRemedyPlan',
    CreateInfrastructureProvision = 'CreateInfrastructureProvision',
    fake2 = 'fake2'
  }

export class ConditionFactory {     
    constructor(private dbConnectionString: string) { }

    create(remedy: ConfigurationDTO): Iaction[] {
        return remedy.Conditions.map(c => this.mapCondition(c));
    }

    private mapCondition(data: Condition): Iaction {
        switch (data.Name) {
            case ConditionTypes.CreateRemedyPlan.toString(): {
                this.checkDataForCreateRemedyPlan(data);
                return new CreateRemediPlan(data.Status, 
                                            new CreateRemedyPlanDB(this.dbConnectionString), 
                                            new CreateAreaWithIFMO(),
                                            new Logger(),
                                            new OwnerFromGlf_FAKE());
            }
            case ConditionTypes.CreateInfrastructureProvision.toString():{
                this.checkDataForCreateInfrastructureProvision(data)
                if (data.DeterminedDuration === true)
                    return new CreateCondition_IP_FixedDuretion(data.KindId, 
                                                  data.TopologyId, 
                                                  data.Duration, 
                                                  new Logger(), 
                                                  new IFMOinteractions_FAKE(new Logger()),
                                                  new UpdateRemediPlanOnMongo(this.dbConnectionString))
                else
                    throw new Error('TODO') //TODO: missing implementation of this class
            }
            default:{
                throw new Error('invalid')
            }
        }
    }

    private checkDataForCreateRemedyPlan(data: Condition) {
        if (!data.Status)
            throw new Error(`Status is null for condition CreateRemedyPlan - configuration data: ${JSON.stringify(data)}`);
    }

    private checkDataForCreateInfrastructureProvision(data: Condition) {
        var errors : string[] = []
        if (!data.Duration)
            errors.push(`Duration is null for condition CreateInfrastructureProvision`)
        if (!data.KindId)
            errors.push(`KindId is null for condition CreateInfrastructureProvision`)
        if (!data.TopologyId)
            errors.push(`TopologyId is null for condition CreateInfrastructureProvision`)
        if (data.DeterminedDuration === undefined)
            errors.push(`DeterminedDuration is null for condition CreateInfrastructureProvision`)            
        if(errors.length>0)
            throw new Error(`ConditionFactory invalid data ${JSON.stringify(errors)} - configuration data: ${JSON.stringify(data)}` )
    }
}
