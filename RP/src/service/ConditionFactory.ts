import { ConfigurationDTO, Condition } from "./ConfigurationDTO";
import { Iaction } from "../businesslogic/conditions/Iaction";
import { CreateRemediPlan } from "../businesslogic/conditions/CreateRemedyPlan";
import { CreateRemedyPlanDB } from "../mongoDB/CreateRemedyPlanDB";
import { Logger } from "../utility/Logger";
import { CreateAreaWithIFMO } from "../api/CreateArea";
import { OwnerFromGlf_FAKE } from "../api/OwnerFromGlf_FAKE";
import { CreateCondition_IP_FixedDuration } from "../businesslogic/conditions/CreateCondition_IP_FixedDuration";
import { CreateCondition_IP_UndeterminedDuration } from "../businesslogic/conditions/CreateCondition_IP_UndeterminedDuration";
import { IFMOinteractions_FAKE } from "../api/IFMOinteractions_FAKE";
import { UpdateRemediPlanOnMongo } from "../mongoDB/UpdateRemediPlanOnMongo";
import { TaskManagerMock } from "../api/TaskManager";

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
        var logger = new Logger()
        switch (data.Name) {
            case ConditionTypes.CreateRemedyPlan.toString(): {
                this.checkDataForCreateRemedyPlan(data);
                return new CreateRemediPlan(data.Status, 
                                            new CreateRemedyPlanDB(this.dbConnectionString), 
                                            new CreateAreaWithIFMO(),
                                            logger,
                                            new OwnerFromGlf_FAKE());
            }
            case ConditionTypes.CreateInfrastructureProvision.toString():{
                this.checkDataForCreateInfrastructureProvision(data)
                if (data.DeterminedDuration === true)
                    return new CreateCondition_IP_FixedDuration(data.KindId, 
                                                                data.TopologyId, 
                                                                data.Duration, 
                                                                logger, 
                                                                new IFMOinteractions_FAKE(logger),
                                                                new UpdateRemediPlanOnMongo(this.dbConnectionString))
                else
                    return new CreateCondition_IP_UndeterminedDuration(data.KindId, 
                                                                       data.TopologyId, 
                                                                       data.Duration, 
                                                                       logger, 
                                                                       new IFMOinteractions_FAKE(logger),
                                                                       new UpdateRemediPlanOnMongo(this.dbConnectionString),
                                                                       new TaskManagerMock(logger))
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
