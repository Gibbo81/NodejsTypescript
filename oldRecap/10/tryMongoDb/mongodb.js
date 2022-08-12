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

//mainTasks() and main() return promises 
//main()
//mainTasks()
//updateTasks()
deleteTasks()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

//interract with user collection
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
        //it's toArray() that return a promise - not find({})  
        var users = await usersCollection.find({ age: { $lt : 70 }}).toArray() 
        console.log(users)
        users = await usersCollection.find({ $and:[ {  age: { $lt : 30 }}, { age: { $gt : 20 }}]}).toArray()
        console.log(users)

        return 'done.';
    }
    catch(e){
        console.log(e)
        throw(e)
  }
}

//interract with task collection
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

        var byId = await collection.findOne({ _id : new ObjectID('62f5097738370aed6b1cb06f') })
        console.log(byId)

        var onlyOne = await collection.find({}).sort({ _id : -1 }).limit(1).toArray() //sort descending(-1) by Id
        console.log( onlyOne[0])
       
        var onlyOne = await collection.find({ completed : false}).toArray() 
        console.log( onlyOne)

        return 'done - 2';
    }
    catch(e){
        console.log(e)
        throw(e)
  }
}

async function updateTasks(){
    try{
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);      
        const collection = db.collection('tasks');

        var result = await collection.updateOne({ _id : new ObjectID('62f5097738370aed6b1cb06f')  },     //filter
                                                { $set:{ description: 'task888', completed: true} })   //update using set operator
        console.log(result)

        result = await collection.updateMany({ description : 'task13'}, { $set: { completed : false}, $inc: { inc: 101.1 }})
        console.log(result)

        return 'DONE3'
    }
    catch(e){
        console.log(e)
        throw(e)
    } 
}

async function deleteTasks(){
    try{
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);      
        const collection = db.collection('tasks');

        var result = await collection.deleteOne({ description: 'task2' })
        console.log(result)

        var result = await collection.deleteMany({$and : [
            { inc : { $lt: 320 }},
            { inc : { $gt: 206 }}]  
        })
        console.log(result)

        return 'DONE - delete'
    }
    catch(e){
        console.log(e)
        throw(e)
    } 
}