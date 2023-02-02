import { ConfigurationDTO, UnplannedChecks } from "./ConfigurationDTO";
import { Logger } from "../utility/Logger";
import { IPlanned } from "../businesslogic/plannedCheck/IPlanned";
import { BrokenTdTAlreadyInsideARemedyPlan } from "../businesslogic/plannedCheck/BrokenTdTAlreadyInsideARemedyPlan";
import { BrokenTdTAlreadyInsideIp } from "../businesslogic/plannedCheck/BrokenTdTAlreadyInsideIp";
import { IFMOinteractions_FAKE } from "../api/IFMOinteractions_FAKE";
import { ReadRPInformationFromMongo } from "../mongoDB/ReadRPInformationFromMongo";

enum PlannedCheckType {
    BrokenTdTAlreadyInsideARemedyPlan = 'BrokenTdTAlreadyInsideARemedyPlan',
    BrokenTdTAlreadyInsideIp = 'BrokenTdTAlreadyInsideIp'
  }

export class PlannedCheckFactory {
    constructor(private dbConnectionString: string) { }

    create(remedy: ConfigurationDTO): IPlanned[] {
        return remedy.Unplanned_checks.map(c => this.mapCheck(c));
    }

    private mapCheck(data: UnplannedChecks): IPlanned {
        var logger = new Logger()
        switch (data.Name) {
            case PlannedCheckType.BrokenTdTAlreadyInsideARemedyPlan.toString(): {
                return new BrokenTdTAlreadyInsideARemedyPlan(logger, 
                                                             new ReadRPInformationFromMongo(this.dbConnectionString, logger), 
                                                             new IFMOinteractions_FAKE(logger))
            }
            case PlannedCheckType.BrokenTdTAlreadyInsideIp.toString():{
                return new BrokenTdTAlreadyInsideIp(new IFMOinteractions_FAKE(logger), logger)
            }
            default:{
                throw new Error(`invalid UnplannedChecks: ${data.Name}`)
            }
        }
    }
}