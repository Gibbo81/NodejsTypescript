import { ISaveNewRemedy } from '../businesslogic/plugIn/ISaveNewRemedy'
import { MongoDbConnectionFactory} from './MongoDbConnectionFactory'
import {RemedyPlanDTO, rootcause} from '../businesslogic/dto/RemedyPlanDTO'
const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId


export class CreateRemedyPlanDB extends MongoDbConnectionFactory implements ISaveNewRemedy{
    private readonly dbName : string = "Remedy_Plan"
    private readonly collectionName : string = 'RemedyPlans'

    constructor( url:string){
        super(url);
    }

    async insert(rp:RemedyPlanDTO) : Promise<string> {
        var connection= await this.createConnection()
        const collection = this.getCollections(connection, this.dbName, this.collectionName);        
        var result = await collection.insertOne(new RemedyPlanForMongoInsert(rp.owner, rp.status, rp.priority, rp.divergences))
        await connection.close()
        return result.insertedId as unknown as string
    }

    async readAll() : Promise<RemedyPlanDTO[]> {
        var connection= await this.createConnection()
        const collection = this.getCollections(connection, this.dbName, this.collectionName);        
        var result = await collection.find({}).toArray()
        await connection.close()
        return result.map(rp => {return {
            id : rp._id as unknown as string,
            owner : rp.owner,
            status : rp.status,
            priority : rp.priority,
            divergences : rp.rootCouses,
            conditions : rp.conditions,
            disservice : rp.disservice,
            alternativeRemedyPlans : rp.alternativeRemedyPlans
        }})
    }
}

class RemedyPlanForMongoInsert{    
    owner : string
    status: string
    priority: number
    rootCouses: rootcauseForMongoInsert[]
    conditions : []
    disservice : []
    alternativeRemedyPlans : []
    constructor(owner:string, status:string, priority:number, divergences: rootcause[]){
        this.owner=owner
        this.status=status
        this.priority=priority
        this.rootCouses = divergences.map(d => new rootcauseForMongoInsert(d))
    }
}

class rootcauseForMongoInsert{
    type: string
    triggerName : string
    id : string
    detectionTime: string
    status: string
    areaId : number
    hidden: boolean
    primary : boolean

    constructor(divergence: rootcause){
        this.type = divergence.type
        this.triggerName = divergence.triggerName
        this.id = divergence.id
        this.detectionTime = divergence.detectionTime
        this.status = divergence.status
        this.areaId = divergence.areaId
        this.hidden = divergence.hidden
        this.primary = divergence.primary
    }
}