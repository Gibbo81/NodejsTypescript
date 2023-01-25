import { IReadRemedyPlan } from "../businesslogic/plugIn/IReadRemedy";
import { MongoDbConnectionFactory} from './MongoDbConnectionFactory'
import { ILogger } from "../businesslogic/plugIn/Ilogger";


export class ReadRPInformationFromMongo extends MongoDbConnectionFactory implements IReadRemedyPlan{
    private readonly dbName : string = "Remedy_Plan"
    private readonly collectionName : string = 'RemedyPlans'
    
    constructor( url:string, private logger:ILogger){
        super(url);
    }
    
    async readRPsAreaByStates(states : string[]): Promise<number[]> {
        this.logger.logDebug(`read RP Areas for state ${JSON.stringify(states)}`)
        var connection= await this.createConnection()
        const collection = this.getCollections(connection, this.dbName, this.collectionName);        
        var rp = await collection.find({status : {$in: states }}).toArray()
        await connection.close()
        var result: number[] = this.extractAreasForReadIP(rp);            
        this.logger.logDebug(`read RP Areas for state ${JSON.stringify(states)} returns: ${JSON.stringify(result)}`)
        return result
    }

    private extractAreasForReadIP(rp) {
        var result: number[] = [];
        for (var x = 0; x < rp.length; x++)
            for (var y = 0; y < rp[x].rootCouses.length; y++)
                if (this.isThisThePrimaryRootCause(rp, x, y))
                    result.push(rp[x].rootCouses[y].areaId);
        return result;
    }

    private isThisThePrimaryRootCause(rp: any, x: number, y: number) {
        return rp[x].rootCouses[y].primary === true;
    }
}