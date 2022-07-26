const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId
const connectionFactory = require('./dbConnection') 
const dbName = "task-manager"
const collectionName = 'tasks'

class dbTask{
    constructor(description, completed, owner, createDate, updateDate){
        this.description = description
        this.completed =(completed === undefined) ? false : completed        
        this.owner = owner
        this.updateDate = updateDate
        this.createDate = createDate
    }
}

const readAllTasks = async function(taskOwner, taskCompleted, page, pagewidth, sortBy){
    const client = await connectionFactory()
    const collection = getCollection(client);
    var conditions = [ {owner: taskOwner }]
    if (taskCompleted !== undefined)
        conditions.push({completed : (taskCompleted === 'true')})    
    var limit = 1* pagewidth        //to make a number
    var sorter={}
    sorter[sortBy]=1
    var tasks = await collection.find({$and : conditions })
                                .sort(sorter)
                                .skip(pagewidth * (page-1))
                                .limit(limit)
                                .toArray()
    client.close()
    var result = []
    tasks.forEach((task) => result.push(new dbTask(task.description, task.completed, task.owner, task.createDate, task.updateDate)))
    return result
}

async function ReadTaskById(id, taskOwner){
    const client = await connectionFactory()
    const collection = getCollection(client);
    var task = await collection.findOne({$and:[ {_id : new ObjectID(id) }, {owner: taskOwner}]})
    client.close()
    if (task)
        return new dbTask(task.description, task.completed, task.owner, task.createDate, task.updateDate)
    return null
}

const createTask = async (data) => {
    const client = await connectionFactory()
    const collection = getCollection(client);
    var result = await collection.insertOne(data)
    client.close()
    return result
}

const deleteTaskById = async (id, taskOwner) => {
    const client = await connectionFactory()    
    const collection = getCollection(client);
    await collection.deleteOne({$and:[ {_id : new ObjectID(id) }, {owner: taskOwner}]})
    var completedTasks = await collection.count({completed : true })
    var pendingTasks = await collection.count({completed : false })
    client.close()
    return { pendingTasks, completedTasks}
}

const updateTaskById = async (id, taskOwner, changes) =>{
    const client = await connectionFactory()    
    const collection = getCollection(client);
    var result = await collection.updateOne({$and:[ {_id : new ObjectID(id) }, {owner: taskOwner}]}, 
                                            { $set: changes})
    client.close()
    return result
}

const getCollection = (client) => {
    const db = client.db(dbName); 
    return db.collection(collectionName)
}

module.exports = {
    addtask : createTask,
    dbTask : dbTask,
    readAllTasks,
    ReadTaskById,
    deleteTaskById,
    updateTaskById
}