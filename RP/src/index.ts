import { ConfigurationReader } from "./service/ConfigurationReader";
import {CreateRemedyPlanDB} from './mongoDB/CreateRemedyPlanDB'
import { CreateRemediPlan } from "./businesslogic/conditions/CreateRemedyPlan";
import { Logger } from "./utility/Logger";
import { ConditionFactory } from "./service/ConditionFactory";

//Fast debug: ts-node ./src/index.ts from javascript debug terminal
const connectionURL = 'mongodb://localhost:27017'

loadConfigurations();
//tryInsertRP()
//readAllRemedyPlanFromMongo()

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
    var creator = new CreateRemediPlan('created', writer, logger)

    creator.execute({
        'owner': 'pippus',
        'status': 'totally fine',
        'priority' : '100'
    }).then(c => console.log('SAVED!!! ' + c))
}
