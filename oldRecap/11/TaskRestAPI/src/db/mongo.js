const mongodb = require('mongodb')
const MongoClient =mongodb.MongoClient

const connectionURL = 'mongodb://localhost:27017'
const dbName = "task-manager"




const client = new MongoClient(connectionURL);







