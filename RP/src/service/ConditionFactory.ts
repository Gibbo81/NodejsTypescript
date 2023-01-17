import { ConfigurationDTO, Condition } from "./ConfigurationDTO";
import { Iaction } from "../businesslogic/conditions/Iaction";
import { CreateRemediPlan } from "../businesslogic/conditions/CreateRemedyPlan";
import { CreateRemedyPlanDB } from "../mongoDB/CreateRemedyPlanDB";
import { Logger } from "../utility/Logger";

enum ConditionTypes {
    CreateRemedyPlan = 'CreateRemedyPlan',
    fake1 = 'fake1',
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
                if(!data.Status)
                    throw new Error('Status is null for condition CreateRemedyPlan')
                return new CreateRemediPlan(data.Status, new CreateRemedyPlanDB(this.dbConnectionString), new Logger());
            }
            case ConditionTypes.fake1.toString():{
                throw new Error('invalid')
            }
            default:{
                throw new Error('invalid')
            }
        }
    }
}
