import { ConfigurationDTO, Condition } from "./ConfigurationDTO";
import { Icondition } from "../businesslogic/conditions/Icondition";
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

    create(remedy: ConfigurationDTO): Icondition[] {
        return remedy.Conditions.map(c => this.mapCondition(c));
    }

    private mapCondition(data: Condition): Icondition {
        switch (data.Name) {
            case ConditionTypes.CreateRemedyPlan.toString(): {
                return new CreateRemediPlan(new CreateRemedyPlanDB(this.dbConnectionString), new Logger());
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
