import { ConfigurationReader } from "./service/ConfigurationReader";
import {CreateRemedyPlanDB} from './mongoDB/CreateRemedyPlanDB'
import { CreateRemediPlan } from "./businesslogic/conditions/CreateRemedyPlan";
import { Logger } from "./utility/Logger";
import { ConditionFactory } from "./service/ConditionFactory";
import { CreateAreaWithIFMO } from "./api/CreateArea";
import { ReadRPInformationFromMongo } from "./mongoDB/ReadRPInformationFromMongo";

//Fast debug: ts-node ./src/index.ts from javascript debug terminal
const connectionURL = 'mongodb://localhost:27017'

//loadConfigurations();
//tryInsertRP()
//readAllRemedyPlanFromMongo()
ReadRPAreas()

function ReadRPAreas(){
    var r = new ReadRPInformationFromMongo(connectionURL, new Logger())
    r.readRPsAreaByStates(['created','completed'])
     .then(x=>console.log(`Areas : ${JSON.stringify(x)}`) )
}

function loadConfigurations() {
    var reader = new ConfigurationReader('./configurations/', new ConditionFactory(connectionURL), new Logger());
    reader.load()
          .then(x => console.log(x));
}

function readAllRemedyPlanFromMongo(){
    var writer = new CreateRemedyPlanDB(connectionURL);
    writer.readAll()
    .then(x => console.log(x))
}

function tryInsertRP() {
    var writer = new CreateRemedyPlanDB(connectionURL);
    var logger = new Logger()
    var areaCreator = new CreateAreaWithIFMO();
    var creator = new CreateRemediPlan('created', writer, areaCreator, logger)

    creator.execute({
        trigger: 'qui-quo-qua',  
        divergenceType : "ooooooooiiiii",      
        parameters:{
            'owner': 'pippus',
            'priority' : '100'
        }        
    }).then(c => console.log(`SAVED!!! ${JSON.stringify(c)}`))
}
