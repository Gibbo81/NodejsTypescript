import { ConfigurationReader } from "./service/ConfigurationReader";
import {CreateRemedyPlanDB} from './mongoDB/CreateRemedyPlanDB'
import {RemedyPlanDTO} from './businesslogic/dto/RemedyPlanDTO'
import { write } from "fs";

//Fast debug: ts-node ./src/index.ts from javascript debug terminal
const connectionURL = 'mongodb://localhost:27017'
console.log('Hello!!!!!')

//loadConfiguratio();
tryInsertUser()
//readAllRemedyPlanFromMongo()

function loadConfiguratio() {
    var reader = new ConfigurationReader('./configurations/');
    reader.load()
          .then(x => console.log(x));
}

function readAllRemedyPlanFromMongo(){
    var writer = new CreateRemedyPlanDB(connectionURL);
    writer.readAll()
    .then(x => console.log(x))
}

function tryInsertUser() {
    var writer = new CreateRemedyPlanDB(connectionURL);
    var dto = new RemedyPlanDTO();
    dto.owner = 'plutus';
    dto.status = 'created';
    dto.priority = 98;
    dto.alternativeRemedyPlans = ['sasad'];
    dto.rootCouses = [{ type: "add", id: '6gdgt5', correlation: 'non si sa' }];
    dto.conditions = [{ id: "rtr", correlation: "first cond" }, { id: "xoc", correlation: "second one" }];
    dto.disservice = [];

    writer.insert(dto).then(c => console.log('SAVED!!! ' + c));
}
