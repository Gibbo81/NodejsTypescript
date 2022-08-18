const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId
const connectionFactory = require('./dbConnection') 
const dbName = "task-manager"
const collectionName = 'tasks'

class dbTask{
    constructor(description, completed){
        this.description = description
        this.completed =(completed === undefined) ? false : completed        
    }
}

const readAllTasks = async function(data){
    const client = await connectionFactory()
    const db = client.db(dbName);      
    const collection = db.collection(collectionName)
    var tasks = await collection.find({}).toArray()
    client.close()
    var result = []
    tasks.forEach((task) => result.push(new dbTask(task.description, task.completed)))
    return result
}

async function ReadTaskById(id){
    const client = await connectionFactory()
    const db = client.db(dbName);      
    const collection = db.collection(collectionName)
    var task = await collection.findOne({_id : new ObjectID(id)})
    client.close()
    if (task)
        return new dbTask(task.description, task.completed)
    return null
}

const createTask = async function(data){
    const client = await connectionFactory()
    const db = client.db(dbName);      

    const collection = db.collection(collectionName)
    var result = await collection.insertOne(data)
    client.close()
    return result
}

module.exports = {
    addtask : createTask,
    dbTask : dbTask,
    readAllTasks,
    ReadTaskById
}