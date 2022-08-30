const userDto = require('../dto/userdto')
const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId
const connectionFactory = require('./dbConnection') 
const dbName = "task-manager"
const collectionName = 'users'

const readAllUsers = async function(){
    const client = await connectionFactory()
    const collection = getCollection(client);
    var users = await collection.find({}).toArray()
    client.close()
    var result = []
    users.forEach((user) => result.push(new userDto(user.name, user.age, user.email, user.password)))
    return result
}

const readUserById = async function(id){
    const client = await connectionFactory()
    const collection = getCollection(client);
    var user = await collection.findOne({_id : new ObjectID(id)})
    client.close()
    return (user) ? new userDto(user.name, user.age, user.email, user.password) : null
}

const createUser = async function(data){
    const client = await connectionFactory()
    const collection = getCollection(client);
    var result = await collection.insertOne(data)
    client.close()
    return await readUserById(result.insertedId)
}

const deleteUserByName = async (userName) => {
    const client = await connectionFactory()
    const collection = getCollection(client);
    await collection.deleteOne({name : userName })
    var remeningAdult = await collection.count({age : { $gte : 18 }})
    var remeningMinor = await collection.count({age : { $lt  : 18 }})
    client.close()
    return { remeningAdult, remeningMinor}
}

const userByName = async (userName) => {
    const client = await connectionFactory()
    const collection = getCollection(client);
    var user = await collection.findOne({name : userName})
    client.close()
    return new userDto(user.name, user.age, user.email, user.password)
}

const updateUserByName = async (userName, userChanges) => {
    const client = await connectionFactory()
    const collection = getCollection(client);
    var result = await collection.updateOne({ name : userName  }, { $set: userChanges})
    client.close()
    return result
}

const getCollection = (client) => {
    const db = client.db(dbName); 
    return db.collection(collectionName)
}

module.exports = {
    addUser : createUser,
    getAllUsers : readAllUsers,
    readUserById,
    deleteUserByName,
    updateUserByName,
    userByName
}