import { remedyPlanConditionDTO } from "../businesslogic/conditions/CreateCondition_IP";
import { IUpdateRemedyPlanCondition } from "../businesslogic/plugIn/IUpdateRemedyPlanCondition";
import { MongoDbConnectionFactory } from "./MongoDbConnectionFactory";
const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId


export class UpdateRemediPlanOnMongo extends MongoDbConnectionFactory implements IUpdateRemedyPlanCondition{
    private readonly dbName : string = "Remedy_Plan"
    private readonly collectionName : string = 'RemedyPlans'

    constructor( url:string){
        super(url);
    }
    
    async insert(condition: remedyPlanConditionDTO): Promise<void> {
        var connection= await this.createConnection()
        const collection = this.getCollections(connection, this.dbName, this.collectionName);        
        var newCondition = new ConditionForMongoInsert(condition.type,
                                                       condition.id,
                                                       condition.startingTime, 
                                                       condition.endTime, 
                                                       condition.duration, 
                                                       condition.conditionUndetermined, 
                                                       condition.areaId)        
        await collection.updateOne({_id : new ObjectID(condition.remedyplanKey)},
                                   {$push : {conditions: newCondition}} )
        await connection.close()
    }
}

class ConditionForMongoInsert{
    type : string
    id : number
    startingTime :string
    endTime : string
    duration : number
    conditionUndetermined : boolean
    areaId: number
    constructor(type : string, id : number, startingTime :Date, endTime : Date, duration : number, conditionUndetermined : boolean, areaId: number){
        this.type = type
        this.id = id
        this.startingTime =startingTime.toUTCString()
        this.endTime =endTime.toUTCString()
        this.duration =duration
        this.conditionUndetermined =conditionUndetermined
        this.areaId =areaId
    }
}