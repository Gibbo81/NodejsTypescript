import { MongoDbConnectionFactory} from './MongoDbConnectionFactory'
import {RemedyPlanDTO} from '../businesslogic/dto/RemedyPlanDTO'
const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId


export class CreateRemedyPlanDB extends MongoDbConnectionFactory{
    private readonly dbName : string = "Remedy_Plan"
    private readonly collectionName : string = 'RemedyPlans'

    constructor( url:string){
        super(url);
    }

    async insert(rp:RemedyPlanDTO) : Promise<string> {
        var connection= await this.createConnection()
        const db = connection.db(this.dbName); 
        const collection = db.collection(this.collectionName)
        var result = await collection.insertOne(rp)
        await connection.close()
        return result.insertedId as unknown as string
    }

    async readAll() : Promise<RemedyPlanDTO[]> {
        var connection= await this.createConnection()
        const db = connection.db(this.dbName); 
        const collection = db.collection(this.collectionName)
        var result = await collection.find({}).toArray()
        await connection.close()
        return result.map(rp => {return {
            id : rp._id as unknown as string,
            owner : rp.owner,
            status : rp.status,
            priority : rp.priority,
            rootCouses : rp.rootCouses,
            conditions : rp.conditions,
            disservice : rp.disservice,
            alternativeRemedyPlans : rp.alternativeRemedyPlans

        }})
    }
}
