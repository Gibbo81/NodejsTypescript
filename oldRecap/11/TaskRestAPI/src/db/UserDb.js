const mongodb = require('mongodb')
const MongoClient =mongodb.MongoClient

const connectionURL = 'mongodb://localhost:27017'
const dbName = "task-manager"


const client = new MongoClient(connectionURL);

const createUser = async function(data){
    await client.connect();

    const db = client.db(dbName);      
    const collection = db.collection('users')
    var result = await collection.insertOne(data)
    return result
}




module.exports = {
    addUser : createUser


}
