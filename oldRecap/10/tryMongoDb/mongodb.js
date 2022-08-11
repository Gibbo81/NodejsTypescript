const mongodb = require('mongodb')
const MongoClient =mongodb.MongoClient
const ObjectID = mongodb.ObjectId

const connectionURL = 'mongodb://localhost:27017'
//const connectionURL = 'mongodb://127.0.0.1:27017' //same as localhost
const dbName = "task-manager"


const client = new MongoClient(connectionURL);

/*with call back
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) =>{
    if(error)
        return console.log('Unable to connect to the DB')
    console.log('Connected corretly')

}) 
*/

//main()
mainTasks()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

async function main() {
    try{
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);      
        const usersCollection = db.collection('users');


        var result = await usersCollection.insertOne({
            name: "luy",
            age: 28
        })
        console.log(result)
        var resultMany = await usersCollection.insertMany([{
            name: "max-many",
            age: 68
        },
        {
            name: "lucy-many",
            age: 69
        } ])
        console.log(resultMany)

        const user = await usersCollection.findOne({ name: "io"});
        console.log(user)
        var users = await usersCollection.find({ age: { $lt : 70 }}).toArray()
        console.log(users)
        users = await usersCollection.find({ $and:[ { age: { $lt : 30 }}, { age: { $gt : 20 }}]}).toArray()
        console.log(users)

        return 'done.';
    }
    catch(e){
        console.log(e)
        throw(e)
  }
}

async function mainTasks() {
    try{
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);      
        const collection = db.collection('tasks');


        var resultMany = await collection.insertMany([{
            description: "task1",
            completed: true
        },
        {
            description: "task2",
            completed: false
        },
        {
            description: "task13",
            completed: true
        } ])
        console.log(resultMany)

        return 'done.';
    }
    catch(e){
        console.log(e)
        throw(e)
  }
}