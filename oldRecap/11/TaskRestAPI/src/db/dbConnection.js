const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://localhost:27017'



const createConnection = async function(){
    const client = new MongoClient(connectionURL);
    await client.connect();
    return client
}

//db.getCollection("users").createIndex( { “name” : 1 } , { unique : true } )
//db.getCollection("tasks").createIndex( { description : 1 } , { unique : true } )

module.exports = createConnection