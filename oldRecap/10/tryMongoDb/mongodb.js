const mongodb = require('mongodb')
const MongoClient =mongodb.MongoClient
const ObjectID = mongodb.ObjectId

//const connectionURL = 'mongodb://localhost:27017'
const connectionURL = 'mongodb://127.0.0.1:27017' //same as localhost
const dbName = "task-manager"


const client = new MongoClient(connectionURL);

class simple{
    constructor(name, age){
        this.name = name
        this.age = age
    }
}

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
//deleteTasks()
//pippus()
//workingWithArray()
removeField()
  .then(result => console.log(result))
  .catch(error => console.log(error))
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
        }])
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

        //https://stackoverflow.com/questions/17039018/how-to-use-a-variable-as-a-field-name-in-mongodb-native-findone
        //if you need to set the key of the query object dynamically:
        var field = 'completed'
        var value = false
        var filter = {}
        filter[field]=value
        var results = await collection.find(filter).toArray()
        console.log( results)

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
                                                { $set:{ description: 'task888', completed: true} })   //update 2 fields using set operator
        console.log(result)

        result = await collection.updateMany({ description : 'task13'}, 
                                             { $set: { completed : false}, $inc: { inc: 101.1 }})
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

async function pippus(){
    try{
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);      
        const collection = db.collection('Pippus');

        var resultMany = await collection.insertMany([{
            name: "max-many",
            age: 68,
            data : {
                preferredBook: "the star",
                preferredColor : 'red'
            }
        },
        {
            name: "lucy-many",
            age: 42,
            data : {
                preferredCar: "Pandabus",
                preferredColor : 'yellow'
            }
        }])
        console.log(resultMany)

        return 'DONE - pippus'
    }
    catch(e){
        console.log(e)
        throw(e)
    } 
}

async function workingWithArray(){
    try{
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);      
        const collection = db.collection('ArrayTry');
        await collection.deleteMany({}); //clean up
        var result = await collection.insertOne({
            name: 'try it',
            elements : [new simple('erich', 22) ,new simple('bob', 65)]
        })
        console.log(result)
        await collection.updateOne({name : 'try it'},
                             { 
                                $pull: { elements: {name:'erich'} },//remove all elements of name 'erich' from array element                     
                             } )
        await collection.updateOne({name : 'try it'},
                                   {$push: { elements: new simple('solidar', 77)} } ) //must be separated operations
        return  await collection.find({}).toArray()    
    }
    catch(e){
        console.log(e)
        throw(e)
    }
}

//remove fields age and data from the document named 'max-many'
async function removeField(){
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName); 
    const collection = db.collection('Pippus');     
    await collection.updateOne({ name: 'max-many'},{ $unset:{ age: '', data : ''} })
    

}

//db.getCollection("users").createIndex( { “name” : 1 } , { unique : true } )
//db.getCollection("tasks").createIndex( { description : 1 } , { unique : true } )