import { MongoClient } from 'mongodb'

export abstract class MongoDbConnectionFactory{
    constructor(private url:string){}

    protected async createConnection() : Promise<MongoClient>{
        const client = new MongoClient(this.url);
        await client.connect();
        return client
    }    

    protected getCollections(connection, dbName: string, collectionName: string) {
        const db = connection.db(dbName);
        const collection = db.collection(collectionName);
        return collection;
    }

    protected  closeConnection = async (con:MongoClient): Promise<void>=> {
        await con.close()
    }
}

