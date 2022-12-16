import { MongoClient } from 'mongodb'

//import fs from "mongodb";
//const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://localhost:27017'

export abstract class MongoDbConnectionFactory{
    constructor(private url:string){}

    protected async createConnection() : Promise<MongoClient>{
        const client = new MongoClient(this.url);
        await client.connect();
        return client
    }    

    protected  closeConnection = async (con:MongoClient): Promise<void>=> {
        await con.close()
    }
}

