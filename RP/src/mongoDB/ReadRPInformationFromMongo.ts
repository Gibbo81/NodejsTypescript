import { IReadRemedyPlan } from "../businesslogic/plugIn/IReadRemedy";
import { MongoDbConnectionFactory} from './MongoDbConnectionFactory'



export class ReadRPInformationFromMongo extends MongoDbConnectionFactory implements IReadRemedyPlan{
    private readonly dbName : string = "Remedy_Plan"
    private readonly collectionName : string = 'RemedyPlans'
    
    constructor( url:string){
        super(url);
    }
    
    
    
    readActiveRPsAreaByStates(states : string[]): Promise<number[]> {

    }

}