const mongoUsers = require('./db/UserDb')
const mongoTasks = require('./db/TaskDb')
const express = require('express')
const app = express()
app.use(express.json())


app.post('/users', async (req, res) =>{
    try{
        var erros = userCheckData(req.body)
        if ( erros.length >0 )
            return createBadRequest(res, erros)

        var newUser = await mongoUsers.addUser(new mongoUsers.dbUser(req.body.name, req.body.age, req.body.personalEmail, req.body.password))
        res.statusCode = 201
        return res.send(newUser)
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

app.get('/users', async (req, res) =>{
    try{
        var users = await mongoUsers.getAllUsers()
        return res.send({ users })
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

app.get('/users/:id', async (req, res) =>{
    try{        
        var user = await mongoUsers.readUserById(req.params.id)
        if (user)
            return res.send({ user })    
        return res.status(404).send({ id : req.params.id })        
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

app.patch('/users/:id', async (req, res) =>{
    try{
        var changes = {};
        if (req.body.name!== undefined)  
            changes.name = req.body.name
        if (req.body.age!== undefined)  
            changes.age = req.body.age
        if (req.body.personalEmail!== undefined)  
            changes.email = req.body.personalEmail
        if (req.body.password!== undefined)  
            changes.password = req.body.password
        if (isEmpty(changes))
            return res.status(400).send({ Error : "No changes present"})

        var result = await mongoUsers.updateUserById(req.params.id, changes)
        if (result.matchedCount === 0)
            return res.status(404).send()
        return res.send(result)       
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

app.delete('/users/:id', async (req, res) =>{
    try{        
        var remainingUser = await mongoUsers.deleteUserById(req.params.id)
        return res.send(remainingUser)            
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

app.post('/tasks', async (req, res) =>{
    try{
        var erros = taskCheckData(req.body)
        if ( erros.length >0 )
            return createBadRequest(res, erros)

        var newTask = await mongoTasks.addtask(new mongoTasks.dbTask(req.body.description, req.body.completed))
        res.statusCode = 201
        return res.send(newTask)
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

app.get('/tasks', async (req, res) =>{
    try{
        var tasks = await mongoTasks.readAllTasks()
        return res.send({ tasks })
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

app.get('/tasks/:id', async (req, res) =>{
    try{        
        var task = await mongoTasks.ReadTaskById(req.params.id)
        if (task)
            return res.send({ task })    
        return res.status(404).send({ id : req.params.id })        
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

app.delete('/tasks/:id', async (req, res) =>{
    try{        
        var remainingTasks = await mongoTasks.deleteTaskById(req.params.id)        
        return res.send(remainingTasks)            
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

app.patch('/tasks/:id', async (req, res) =>{
    try{
        var changes = {};
        if (req.body.description !== undefined)  
            changes.description = req.body.description
        if (req.body.completed !== undefined)  
            changes.completed = req.body.completed
        if (isEmpty(changes))
            return res.status(400).send({ Error : "No changes present"})

        var result = await mongoTasks.updateTaskById(req.params.id, changes)
        if (result.matchedCount === 0)
            return res.status(404).send()
        return res.send(result)       
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

function taskCheckData(request){
    result =[]
    if ( request.description === undefined )
        result.push('missing description')
    return result;
}

function userCheckData(request){
    result =[]
    if ( request.name === undefined  )
        result.push('missing name')
    if ( request.password === undefined  )
        result.push('missing password')
    if ( request.personalEmail  === undefined )
        result.push('missing email')
    return result;
}

function CreateError(e){
    return {
        errorMessage: e.message,
        stack  : e.stack           
    }
}

function createBadRequest(res, erros){
    return res.status(400).send({ missingFields : erros})
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

//start listening on port 3010
app.listen(3010, () =>{
    console.log('server started')
})