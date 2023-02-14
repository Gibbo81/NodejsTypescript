import { ConfigurationReader } from "./service/ConfigurationReader";
import {CreateRemedyPlanDB} from './mongoDB/CreateRemedyPlanDB'
import { CreateRemediPlan } from "./businesslogic/conditions/CreateRemedyPlan";
import { Logger } from "./utility/Logger";
import { ConditionFactory } from "./service/ConditionFactory";
import { CreateAreaWithIFMO } from "./api/CreateArea";
import { ReadRPInformationFromMongo } from "./mongoDB/ReadRPInformationFromMongo";
import { PlannedCheckFactory } from "./service/PlannedCheckFactory";
import { OwnerFromGlf_FAKE } from "./api/OwnerFromGlf_FAKE";
import { ApplicatinLogic } from "./businesslogic/ApplicatinLogic";


//Fast debug: ts-node ./src/index.ts from javascript debug terminal
const connectionURL = 'mongodb://localhost:27017'

insertNewRemedyPlanInsideDB('API_POST_input1', 'Broken_TDT')
//loadConfigurations();
//readAllRemedyPlanFromMongo()
//ReadRPAreas()

function ReadRPAreas(){
    var r = new ReadRPInformationFromMongo(connectionURL, new Logger())
    r.readRPsAreaByStates(['created','completed'])
     .then(x=>console.log(`Areas : ${JSON.stringify(x)}`) )
}

function loadConfigurations() {
    var reader = new ConfigurationReader('./configurations/', 
                                         new ConditionFactory(connectionURL), 
                                         new PlannedCheckFactory(connectionURL),
                                         new Logger());
    reader.load()
          .then(x => 
            console.log(x));
}

function insertNewRemedyPlanInsideDB(triggerName: string, divergenceType: string) {
    var reader = new ConfigurationReader('./configurations/', 
                                         new ConditionFactory(connectionURL), 
                                         new PlannedCheckFactory(connectionURL),
                                         new Logger());
    reader.load()
          .then(x => {
                var app = new ApplicatinLogic(x)
                app.externalTrigger(triggerName, divergenceType)
          });
}

function readAllRemedyPlanFromMongo(){
    var writer = new CreateRemedyPlanDB(connectionURL);
    writer.readAll()
    .then(x => 
        console.log(x))
}

