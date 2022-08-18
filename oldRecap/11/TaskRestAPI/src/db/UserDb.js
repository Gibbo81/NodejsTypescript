const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId
const connectionFactory = require('./dbConnection') 
const dbName = "task-manager"
const collectionName = 'users'


class dbUser{
    constructor(name, age, email, password){
        this.name = name
        this.age = age
        this.email = email
        this.password = password
    }
}

const readAllUsers = async function(){
    const client = await connectionFactory()
    const db = client.db(dbName);      
    const collection = db.collection(collectionName)
    var users = await collection.find({}).toArray()
    client.close()
    var result = []
    users.forEach((user) => result.push(new dbUser(user.name, user.age, user.email, user.password)))
    return result
}

const readUserById = async function(id){
    const client = await connectionFactory()
    const db = client.db(dbName);      
    const collection = db.collection(collectionName)
    var user = await collection.findOne({_id : new ObjectID(id)})
    client.close()
    return (user) ? new dbUser(user.name, user.age, user.email, user.password) : null
}

const createUser = async function(data){
    const client = await connectionFactory()
    const db = client.db(dbName);      
    const collection = db.collection(collectionName)
    var result = await collection.insertOne(data)
    client.close()
    return result
}

module.exports = {
    addUser : createUser,
    dbUser : dbUser,
    getAllUsers : readAllUsers,
    readUserById
}